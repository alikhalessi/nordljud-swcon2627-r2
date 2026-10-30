export const AUTOMATIC_WAIT_MS = 15_000;
export type OperationKind = "read" | "write";
export type OperationFailureReason = "timeout" | "cancelled" | "failed" | "context-changed";
export type OperationResult<T> = { status: "ready" | "saved"; value: T } | { status: "unavailable" | "unknown" | "stale"; reason: OperationFailureReason };
export interface OperationOptions { kind: OperationKind; signal?: AbortSignal; isCurrent?: () => boolean; timeoutMs?: number }

/** A client wait limit cannot prove that an unacknowledged server write stopped. */
export function runAutomaticOperation<T>(work: (signal: AbortSignal) => Promise<T>, options: OperationOptions): Promise<OperationResult<T>> {
  return new Promise(resolve => {
    const controller = new AbortController();
    let settled = false;
    const timer = setTimeout(() => { controller.abort(); fail("timeout"); }, options.timeoutMs ?? AUTOMATIC_WAIT_MS);
    const current = () => options.isCurrent?.() !== false;
    const finish = (result: OperationResult<T>) => {
      if (settled) return;
      settled = true;
      if (timer !== undefined) clearTimeout(timer);
      options.signal?.removeEventListener("abort", cancel);
      resolve(result);
    };
    const fail = (reason: OperationFailureReason) => {
      if (!current()) finish({ status: "stale", reason: "context-changed" });
      else finish({ status: options.kind === "write" ? "unknown" : "unavailable", reason });
    };
    const cancel = () => { controller.abort(); fail("cancelled"); };
    if (!current()) { finish({ status: "stale", reason: "context-changed" }); return; }
    if (options.signal?.aborted) { cancel(); return; }
    options.signal?.addEventListener("abort", cancel, { once: true });
    try {
      Promise.resolve(work(controller.signal)).then(value => {
        if (!current()) finish({ status: "stale", reason: "context-changed" });
        else finish({ status: options.kind === "write" ? "saved" : "ready", value });
      }, () => fail("failed"));
    } catch { fail("failed"); }
  });
}

/** Reconciliation reports the current desired state; it never replays a write. */
export function reconcileWriteIntent(input: { sameContext: boolean; readAvailable: boolean; matchesIntent: boolean }): "saved" | "unknown" | "conflict" | "obsolete" {
  if (!input.sameContext) return "obsolete";
  if (!input.readAvailable) return "unknown";
  return input.matchesIntent ? "saved" : "conflict";
}
