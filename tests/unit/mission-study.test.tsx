import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MissionStudy } from "../../src/components/MissionStudy";
import type { Mission } from "../../src/domain/contracts";
const example = { word: "arbetar", sv: "Jag arbetar på ett kontor.", en: "I work in an office." };
const mission = { id: "A2-WORK-01", level: "A2", title: "Talking about your work", learnerGoal: "Understand the supplied work example.", verb: "arbeta", formKeys: ["Pres"], sourceSenseId: "A2:0014", sourceManifestId: "fixture-only", sense: { id: "A2:0014", senseId: "A2:0014", level: "A2", ordinal: 14, v: "arbeta", meaning: "work", frequency: "A1", page: 1, forms: { Pres: example }, availability: { Pres: { word: true, sv: true, en: true } } } } as unknown as Mission;
describe("mission study source assistance (synthetic bounded UI fixture)", () => {
 it("shows supplied Swedish with translation hidden until requested", () => {
  const toggle = vi.fn();
  const { rerender } = render(<MissionStudy mission={mission} englishVisible={false} onToggleEnglish={toggle} />);
  expect(screen.getByRole("heading", { name: mission.title })).toBeInTheDocument();
  expect(screen.getByText(example.sv)).toBeInTheDocument();
  expect(screen.queryByText(example.en)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Show English" }));
  expect(toggle).toHaveBeenCalledOnce();
  rerender(<MissionStudy mission={mission} englishVisible={true} onToggleEnglish={toggle} />);
  expect(screen.getByText(example.sv)).toBeInTheDocument();
  expect(screen.getByText(example.en)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Hide English" })).toHaveAttribute("aria-expanded", "true");
 });
 it("preserves usable examples when the form word is unavailable", () => {
  const missing = structuredClone(mission);
  missing.sense.forms.Pres.word = "—";
  missing.sense.availability.Pres.word = false;
  render(<MissionStudy mission={missing} englishVisible={true} onToggleEnglish={() => {}} />);
  expect(screen.getByText(example.sv)).toBeInTheDocument();
  expect(screen.getByText(example.en)).toBeInTheDocument();
  expect(screen.getByText("Form unavailable")).toBeInTheDocument();
 });
});
