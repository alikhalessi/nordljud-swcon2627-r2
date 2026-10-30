import type { CheckChoice, CheckDefinition, CheckKind, FormKey, Mission, MissionChecks, SenseRecord } from "./contracts";
import { fieldAvailable } from "./availability";

function defineCheck(mission: Mission, records: SenseRecord[], kind: CheckKind, formKey: FormKey): CheckDefinition {
  const form = mission.sense.forms[formKey];
  const field = kind === "comprehension" ? "en" : "word";
  const correct = form?.[field];
  const sourceText = fieldAvailable(form?.sv) ? form.sv : mission.sense.v;
  const prompt = kind === "comprehension" ? "Choose the stored English translation of this Swedish example." : `Choose the stored ${formKey} verb form of “${mission.sense.v}”.`;
  const unavailable = (reason: string): CheckDefinition => ({ id: `${mission.id}:${kind}`, kind, prompt, sourceText, formKey,
    available: false, unavailableReason: reason, choices: [], correctChoiceId: null });
  if (!fieldAvailable(correct) || (kind === "comprehension" && !fieldAvailable(form?.sv))) return unavailable("The required source field is unavailable. Other study remains available.");
  const correctChoiceId = `${mission.sense.id}:${formKey}:${field}`;
  const choices: CheckChoice[] = [{ id: correctChoiceId, label: correct }];
  const used = new Set([correct]);
  for (const record of records) {
    if (record.level !== mission.level) continue;
    const label = record.forms[formKey]?.[field];
    if (!fieldAvailable(label) || used.has(label)) continue;
    used.add(label);
    choices.push({ id: `${record.id}:${formKey}:${field}`, label });
    if (choices.length === 4) break;
  }
  if (choices.length < 2) return unavailable("Not enough distinct usable source choices are available.");
  // A stable rotation avoids always displaying the source-backed answer first.
  const offset = mission.sense.ordinal % choices.length;
  const rotated = choices.slice(offset).concat(choices.slice(0, offset));
  return { id: `${mission.id}:${kind}`, kind, prompt, sourceText, formKey, available: true,
    unavailableReason: null, choices: rotated, correctChoiceId };
}

export function createChecks(mission: Mission, records: SenseRecord[]): MissionChecks {
  const formKey: FormKey = mission.formKeys.includes("Pres") ? "Pres" : mission.formKeys[0] ?? "Pres";
  return { comprehension: defineCheck(mission, records, "comprehension", formKey), verbForm: defineCheck(mission, records, "verbForm", formKey) };
}
