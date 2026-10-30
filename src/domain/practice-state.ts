import type { CheckDefinition, PracticeOutcome, PracticeState } from "./contracts";

let fallbackSequence = 0;
export function beginAttempt(previous: PracticeState | null = null, attemptId?: string): PracticeState {
  const id = attemptId ?? globalThis.crypto?.randomUUID?.() ?? `attempt-${Date.now()}-${++fallbackSequence}`;
  if (!id) throw new RangeError("An attempt identity is required");
  return { attemptId: id, revealed: false, outcome: null, latestOutcome: previous?.latestOutcome ?? null, selectedChoiceId: null, credit: 0 };
}

function outcomeState(state: PracticeState, outcome: PracticeOutcome, selectedChoiceId: string | null, revealed = state.revealed): PracticeState {
  return { ...state, outcome, latestOutcome: outcome, selectedChoiceId, revealed, credit: outcome === "correct" && !revealed ? 1 : 0 };
}

export function answerCheck(check: CheckDefinition, state: PracticeState, choiceId: string): PracticeState {
  if (!check.available || !check.correctChoiceId || !check.choices.some(choice => choice.id === check.correctChoiceId)) return outcomeState(state, "unavailable", null);
  if (!check.choices.some(choice => choice.id === choiceId)) throw new RangeError("Choose one of the source-backed answers");
  const outcome: PracticeOutcome = state.revealed ? "revealed" : choiceId === check.correctChoiceId ? "correct" : "incorrect";
  return outcomeState(state, outcome, choiceId);
}

export function revealCheck(check: CheckDefinition, state: PracticeState): PracticeState {
  if (!check.available || !check.correctChoiceId) return outcomeState(state, "unavailable", null);
  return outcomeState(state, "revealed", null, true);
}
