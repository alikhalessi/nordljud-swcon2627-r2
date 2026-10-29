"use client";

import { useEffect, useState } from "react";
import type { Level } from "./learning-app";
import { isAvailableFormWord } from "../lib/practice-engine.mjs";

type Form = { word?: string; sv?: string; en?: string };
type ComparedEntry = { id: string; verb: string; meaning: string; forms: Record<string, Form> };
type ComparisonResponse = {
  verb: string;
  meaning: string;
  matches: Record<Level, ComparedEntry | null>;
};
const levels: Level[] = ["A2", "B1", "B2", "C1"];
const formChoices = [
  { key: "Inf", label: "Infinitive" },
  { key: "Imp", label: "Imperative" },
  { key: "Pres", label: "Present" },
  { key: "Pret", label: "Past" },
  { key: "Sup", label: "Supine" }
] as const;
type FormKey = (typeof formChoices)[number]["key"];

export default function LevelComparison({
  verb, meaning, currentLevel, speak
}: {
  verb: string;
  meaning: string;
  currentLevel: Level;
  speak: (text: string, label: string) => void;
}) {
  const [formKey, setFormKey] = useState<FormKey>("Pres");
  const [data, setData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setData(null);

    async function load() {
      try {
        const params = new URLSearchParams({ verb, meaning });
        const response = await fetch(`/api/compare-verb?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`Comparison unavailable (${response.status})`);
        const result = (await response.json()) as ComparisonResponse;
        if (!result.matches || result.verb !== verb || result.meaning !== meaning) {
          throw new Error("Comparison data did not match the selected meaning.");
        }
        if (!controller.signal.aborted) setData(result);
      } catch (reason) {
        if (!controller.signal.aborted) {
          setError(reason instanceof Error ? reason.message : "Unable to compare this verb.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [verb, meaning]);

  return (
    <section className="level-comparison" aria-labelledby="level-comparison-heading">
      <div className="comparison-heading">
        <span className="eyebrow">ONE VERB · FOUR LEVELS</span>
        <h4 id="level-comparison-heading">Compare the same verb across A2–C1</h4>
        <p><strong lang="sv">{verb}</strong> · {meaning}</p>
      </div>
      <p className="comparison-description">
        Choose a form to see how the original Swedish sentences and English translations change between levels.
      </p>
      <div className="comparison-form-tabs" role="group" aria-label="Choose verb form to compare">
        {formChoices.map(({ key, label }) => (
          <button
            key={key} type="button"
            className={formKey === key ? "selected" : ""}
            aria-pressed={formKey === key}
            onClick={() => setFormKey(key)}
          >{label}</button>
        ))}
      </div>
      {loading && <p role="status" className="vocabulary-notice">Loading four-level comparison...</p>}
      {error && <p role="alert" className="vocabulary-notice">{error}</p>}
      {!loading && data && (
        <div className="comparison-grid">
          {levels.map((level) => {
            const entry = data.matches[level];
            const form = entry?.forms[formKey];
            return (
              <article className={`comparison-card ${level === currentLevel ? "current" : ""}`} key={level}>
                <div className="comparison-card-head">
                  <strong>{level}</strong>
                  {level === currentLevel && <span>Currently browsing</span>}
                </div>
                {entry ? (
                  <>
                    <p className="comparison-verb-form" lang="sv">{isAvailableFormWord(form?.word) ? form!.word : "Form not available"}</p>
                    {form?.sv?.trim()
                      ? <p className="comparison-swedish" lang="sv">{form.sv}</p>
                      : <p className="comparison-missing">No Swedish example in source data.</p>}
                    {form?.en?.trim()
                      ? <p className="comparison-english">{form.en}</p>
                      : <p className="comparison-missing">No English translation in source data.</p>}
                    {form?.sv?.trim() && (
                      <button
                        type="button"
                        className="speech-control"
                        onClick={() => speak(form.sv!, `${level} comparison example`)}
                        aria-label={`Listen to the ${level} Swedish example`}
                      ><span aria-hidden="true">♫</span> Listen to example</button>
                    )}
                  </>
                ) : <p className="comparison-missing">This exact meaning is not in the {level} source dataset.</p>}
              </article>
            );
          })}
        </div>
      )}
      <p className="detail-footnote">
        Examples are unchanged from the shared library. Missing conjugations are not spoken or treated as valid forms; linguistic review remains necessary.
      </p>
    </section>
  );
}
