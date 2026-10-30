import { describe, expect, it } from "vitest";
import { createChecks } from "../../src/domain/check-definitions";
import { beginAttempt, answerCheck, revealCheck } from "../../src/domain/practice-state";
import { getMission } from "../../src/data/missions";
import { loadLexicon } from "../../src/data/lexicon";
describe("truthful practice outcomes", () => {
  for (const kind of ["comprehension","verbForm"] as const) it(`distinguishes actual correct, wrong and revealed ${kind} responses`, () => {
    const check=createChecks(getMission("A2"),loadLexicon("A2").records)[kind];
    const correct=check.correctChoiceId!;
    const wrong=check.choices.find(c=>c.id!==correct)!.id;
    const initial=beginAttempt(null,"attempt-1");
    expect(answerCheck(check,initial,correct)).toMatchObject({outcome:"correct",latestOutcome:"correct",credit:1,revealed:false});
    expect(answerCheck(check,initial,wrong)).toMatchObject({outcome:"incorrect",latestOutcome:"incorrect",credit:0});
    const revealed=revealCheck(check,initial);
    expect(revealed).toMatchObject({outcome:"revealed",latestOutcome:"revealed",credit:0,revealed:true});
    expect(answerCheck(check,revealed,correct)).toMatchObject({outcome:"revealed",credit:0,revealed:true});
    const retry=beginAttempt(revealed,"attempt-2");
    expect(retry).toMatchObject({attemptId:"attempt-2",outcome:null,latestOutcome:"revealed",credit:0,revealed:false});
    expect(answerCheck(check,retry,correct)).toMatchObject({outcome:"correct",credit:1});
    expect(revealed.outcome).toBe("revealed");
    expect(initial.outcome).toBeNull();
  });
  it("gives unavailable checks no credit and rejects unknown source choices", () => {
    const check=createChecks(getMission("A2"),loadLexicon("A2").records).verbForm;
    const unavailable={...check,available:false,choices:[],correctChoiceId:null};
    expect(answerCheck(unavailable,beginAttempt(null,"x"),"anything")).toMatchObject({outcome:"unavailable",credit:0});
    expect(revealCheck(unavailable,beginAttempt(null,"y"))).toMatchObject({outcome:"unavailable",credit:0});
    expect(()=>answerCheck(check,beginAttempt(null,"z"),"not-a-source-choice")).toThrow();
  });
});
