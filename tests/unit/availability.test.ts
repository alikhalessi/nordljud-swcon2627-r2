import { describe, expect, it } from "vitest";
import { fieldAvailable, formAvailability } from "../../src/domain/availability";

describe("source availability without content repair", () => {
  it("accepts authentic stored strings and rejects blank/editorial placeholders", () => {
    expect(fieldAvailable("arbetar")).toBe(true);
    for (const value of [undefined, null, "", "  ", "—", "[missing]", "N/A"]) expect(fieldAvailable(value)).toBe(false);
  });
  it("derives availability independently for word and each example", () => {
    const form = { word: "—", sv: "Original Swedish example", en: "Original English example" };
    expect(formAvailability(form)).toEqual({ word: false, sv: true, en: true });
    expect(form).toEqual({ word: "—", sv: "Original Swedish example", en: "Original English example" });
    expect(formAvailability({ word: "arbetar", sv: "", en: "translation" })).toEqual({ word: true, sv: false, en: true });
  });
});
