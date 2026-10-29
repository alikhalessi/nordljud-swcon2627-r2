"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getBrowserAuth } from "../../../lib/supabase-browser";
import { authErrorText } from "../../../lib/auth-flow.mjs";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Validating your recovery link…");
  const [error, setError] = useState("");
  const started = useRef(false);
  const recoveredUserId = useRef<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let active = true;
    const db = getBrowserAuth();
    if (!db) {
      setStatus("Authentication is unavailable.");
      return;
    }
    const { data: { subscription } } = db.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "SIGNED_OUT" ||
          (recoveredUserId.current && session?.user.id !== recoveredUserId.current)) {
        recoveredUserId.current = null;
        setReady(false);
        setPassword("");
        setStatus("Your recovery session ended. Request a new password reset link.");
      }
    });
    const run = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has("error") || params.has("error_description")) {
          throw new Error("Recovery provider returned an error");
        }
        const code = params.get("code");
        if (!code) throw new Error("Missing one-time password recovery code");
        window.history.replaceState(null, "", "/auth/reset");
        // An older session cannot authorize recovery. This route requires the new PKCE code.
        const exchanged = await db.auth.exchangeCodeForSession(code);
        if (exchanged.error || !exchanged.data.session) {
          throw exchanged.error ?? new Error("Recovery code could not be exchanged");
        }
        const verified = await db.auth.getUser();
        if (verified.error || !verified.data.user ||
            verified.data.user.id !== exchanged.data.session.user.id) {
          throw verified.error ?? new Error("Recovery session identity is not verified");
        }
        if (!active) return;
        recoveredUserId.current = verified.data.user.id;
        setReady(true);
        setStatus("Choose a new password for this recovered account.");
      } catch {
        if (!active) return;
        window.history.replaceState(null, "", "/auth/reset");
        recoveredUserId.current = null;
        setReady(false);
        setStatus("Your recovery link is invalid or expired. Request a new password reset email.");
      }
    };
    void run();
    return () => {
      active = false;
      subscription.unsubscribe();
      recoveredUserId.current = null;
    };
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const db = getBrowserAuth();
    const id = recoveredUserId.current;
    if (!db || !id || !ready || busy) return;
    if (password.length < 12) {
      setError("Use a password of at least 12 characters.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      // Revalidate ownership immediately before the sensitive account update.
      const checked = await db.auth.getUser();
      if (checked.error || checked.data.user?.id !== id) {
        throw new Error("The recovered account session has changed");
      }
      const { error: failure } = await db.auth.updateUser({ password });
      if (failure) throw failure;
      setPassword("");
      setReady(false);
      recoveredUserId.current = null;
      setStatus("Password changed. You can return to Nordljud.");
    } catch (cause) {
      setError(authErrorText(cause instanceof Error ? cause : null));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="site">
      <section className="daily-archive" aria-labelledby="reset-title">
        <h1 id="reset-title">Reset your Nordljud password</h1>
        <p role="status">{status}</p>
        {ready && (
          <form className="auth-form" onSubmit={(e) => void submit(e)}>
            <label htmlFor="new-account-password">New password</label>
            <input id="new-account-password" type="password" required minLength={12}
              autoComplete="new-password" value={password}
              onChange={(e) => setPassword(e.target.value)} disabled={busy}/>
            <button disabled={busy} type="submit">
              {busy ? "Updating…" : "Update password"}
            </button>
          </form>
        )}
        {error && <p role="alert">{error}</p>}
        <a href="/">Back to Nordljud</a>
      </section>
    </main>
  );
}
