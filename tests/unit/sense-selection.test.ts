import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Level, SenseRecord } from "../../src/domain/contracts";
import { searchSenses, resolveCounterpart } from "../../src/domain/sense-selection";
function fixture(level: Level, ordinal: number): SenseRecord {
  const raw = JSON.parse(readFileSync(`shared-content/verb-library/${level}.json`, "utf8"))[ordinal];
  return { ...raw, id: `${level}:${String(ordinal).padStart(4,"0")}`, senseId: `${level}:${String(ordinal).padStart(4,"0")}`, level, ordinal, availability: {} };
}
describe("exact spelling and semantic counterpart selection", () => {
  it("returns both distinct senses for an exact spelling and honest empty results", () => {
    const records = [fixture("A2",361), fixture("A2",362), fixture("A2",14)];
    expect(searchSenses(records, "sticka").map(r => r.id)).toEqual(["A2:0361", "A2:0362"]);
    expect(searchSenses(records, "not-a-source-spelling")).toEqual([]);
    expect(searchSenses(records, "")).toEqual(records);
  });
  it("matches the unique exact pair, never the spelling alone", () => {
    const source = fixture("A2",361), target = [fixture("C1",362),fixture("C1",361)];
    expect(resolveCounterpart(source,target)).toEqual({sense:target[1],reason:null});
    expect(resolveCounterpart(source,[target[0]])).toEqual({sense:null,reason:"missing"});
    expect(resolveCounterpart(source,[target[1],{...target[1],id:"C1:duplicate"}])).toEqual({sense:null,reason:"ambiguous"});
    expect(resolveCounterpart(source,[{...target[1],meaning:target[1].meaning+" "}])).toEqual({sense:null,reason:"missing"});
    expect(source.id).toBe("A2:0361");
  });
});
