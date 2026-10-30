import { describe, expect, it, vi } from "vitest";
import { requestSwedishSpeech, type SpeechEnvironment, type SpeechUtteranceLike } from "../../src/speech/swedish";
function environment(voices = [{ lang: "sv-SE" }]) {
 const utterance: SpeechUtteranceLike = { text: "", lang: "", onstart: null, onend: null, onerror: null };
 const env: SpeechEnvironment = { getVoices: () => voices, createUtterance: (text) => { utterance.text = text; return utterance; }, speak: vi.fn(), cancel: vi.fn() };
 return { env, utterance };
}
describe("Swedish speech request contract, mocked API only", () => {
 it("requests the exact supplied text and sv-SE without claiming it was heard", () => {
  const { env, utterance } = environment();
  const result = requestSwedishSpeech("Jag arbetar på ett kontor.", undefined, env);
  expect(result.status).toBe("requested");
  expect(utterance.text).toBe("Jag arbetar på ett kontor.");
  expect(utterance.lang).toBe("sv-SE");
  expect(env.speak).toHaveBeenCalledWith(utterance);
  expect(result.message).not.toMatch(/heard|successfully pronounced/i);
 });
 it("retains usable learning when no Swedish voice is available", () => {
  const { env } = environment([{ lang: "en-US" }]);
  const result = requestSwedishSpeech("Svenska", undefined, env);
  expect(result.status).toBe("unavailable");
  expect(result.message).toMatch(/continue reading/i);
  expect(env.speak).not.toHaveBeenCalled();
 });
 it("reports an utterance error rather than false success", () => {
  const { env, utterance } = environment();
  const onChange = vi.fn();
  requestSwedishSpeech("Svenska", onChange, env);
  utterance.onerror?.();
  expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ status: "error" }));
 });
 it("handles a missing browser speech API", () => {
  expect(requestSwedishSpeech("Svenska", undefined, null).status).toBe("unavailable");
 });
});
