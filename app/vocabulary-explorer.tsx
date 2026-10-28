"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Level } from "./learning-app";

type VerbForm = { word?: string; sv?: string; en?: string };
type VocabularyEntry = {
  id: string;
  verb: string;
  meaning: string;
  forms: Record<string, VerbForm>;
};
type VocabularyResponse = {
  level: Level;
  count: number;
  entries: VocabularyEntry[];
};

const PAGE_SIZE = 24;
const forms = [
  { key: "Inf", label: "Infinitive" },
  { key: "Imp", label: "Imperative" },
  { key: "Pres", label: "Present" },
  { key: "Pret", label: "Past (preterite)" },
  { key: "Sup", label: "Supine" }
] as const;

export default function VocabularyExplorer({ level }: { level: Level }) {
  const cachedLevels = useRef<Partial<Record<Level, VocabularyEntry[]>>>({});
  const [entries, setEntries] = useState<VocabularyEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Changing a level starts a fresh browse; cross-level synchronization is V-003.
    setQuery("");
    setPage(0);
    setSelectedId(null);
    const cached = cachedLevels.current[level];
    if (cached) {
      setEntries(cached);
      setSelectedId(cached[0]?.id ?? null);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();
    setEntries([]);
    setLoading(true);
    setError("");

    async function loadLevel() {
      try {
        const response = await fetch(`/api/verbs?level=${level}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`Vocabulary request failed: ${response.status}`);
        const payload = (await response.json()) as VocabularyResponse;
        if (payload.level !== level || !Array.isArray(payload.entries) ||
            payload.count !== payload.entries.length) {
          throw new Error("The vocabulary response did not match the selected level.");
        }
        if (controller.signal.aborted) return;
        cachedLevels.current[level] = payload.entries;
        setEntries(payload.entries);
        setSelectedId(payload.entries[0]?.id ?? null);
      } catch (cause) {
        if (controller.signal.aborted) return;
        setError(cause instanceof Error ? cause.message : "Could not load vocabulary.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadLevel();
    return () => controller.abort();
  }, [level]);

  const matching = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("sv");
    if (!term) return entries;
    return entries.filter(({ verb, meaning }) =>
      verb.toLocaleLowerCase("sv").includes(term) ||
      meaning.toLocaleLowerCase("en").includes(term)
    );
  }, [entries, query]);

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const pageEntries = matching.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const chosen = entries.find((row) => row.id === selectedId);

  return (
    <section className="vocabulary" aria-labelledby="vocabulary-heading">
      <div className="section-top vocabulary-header">
        <div>
          <span className="eyebrow">EXPLORE YOUR WORDS</span>
          <h2 id="vocabulary-heading">Vocabulary explorer</h2>
          <p>Browse the full {level} verb library, then choose a word to study.</p>
        </div>
        <span className="vocabulary-count">
          {loading ? "Loading..." : error ? "Unavailable" : `${entries.length} entries in ${level}`}
        </span>
      </div>

      {loading && <p className="vocabulary-notice" role="status">Loading {level} verbs...</p>}
      {error && <p className="vocabulary-notice" role="alert">
        Could not load the vocabulary. {error}
        <span> Select another level and return to try again.</span>
      </p>}

      {!loading && !error && (
        <div className="vocabulary-columns">
          <div className="vocabulary-browser">
            <label className="search-label" htmlFor="verb-search">
              Find a Swedish verb or English meaning
            </label>
            <input
              id="verb-search"
              className="verb-search"
              type="search"
              value={query}
              placeholder="e.g. arbeta, work..."
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
            />
            <p className="vocabulary-results" role="status">
              {matching.length} {matching.length === 1 ? "entry" : "entries"} found
              {matching.length !== entries.length ? ` from ${entries.length}` : ""}
            </p>

            {matching.length === 0 ? (
              <p className="empty-results">No matching verbs. Try another search.</p>
            ) : (
              <>
                <div className="verb-list" aria-label={`${level} Swedish verbs`}>
                  {pageEntries.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`verb-list-item ${item.id === selectedId ? "chosen" : ""}`}
                      aria-pressed={item.id === selectedId}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <span lang="sv" className="verb-list-word">{item.verb}</span>
                      <span className="verb-list-meaning">{item.meaning}</span>
                    </button>
                  ))}
                </div>
                <div className="vocabulary-pages">
                  <button type="button" disabled={page === 0} onClick={() => setPage((n) => Math.max(0, n - 1))}>
                    Previous
                  </button>
                  <span>Page {page + 1} of {pageCount}</span>
                  <button type="button" disabled={page + 1 >= pageCount} onClick={() => setPage((n) => Math.min(pageCount - 1, n + 1))}>
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="vocabulary-detail">
            {chosen ? (
              <>
                <div className="detail-heading">
                  <span className="eyebrow">SELECTED VERB · {level}</span>
                  <h3 lang="sv">{chosen.verb}</h3>
                  <p><strong>English meaning:</strong> {chosen.meaning}</p>
                </div>
                <h4>Verb forms and examples</h4>
                <div className="verb-forms">
                  {forms.map(({ key, label }) => {
                    const form = chosen.forms[key];
                    return (
                      <div className="verb-form-row" key={key}>
                        <div className="form-title">
                          <span>{label}</span>
                          <strong lang="sv">{form?.word || "Not provided"}</strong>
                        </div>
                        {form?.sv && (
                          <p className="form-swedish" lang="sv">{form.sv}</p>
                        )}
                        {form?.en && <p className="form-english">{form.en}</p>}
                        {!form?.sv && !form?.en && <p className="form-english">No example in source data.</p>}
                      </div>
                    );
                  })}
                </div>
                <p className="detail-footnote">
                  These examples come from the project dataset; linguistic review is planned for a later stage.
                </p>
              </>
            ) : (
              <p className="empty-results">Select a verb to see its forms and examples.</p>
            )}
          </div>
        </div>
      )}
      <p className="vocabulary-explanation">
        The mini lesson and translation question below still use a fixed example for each level.
        Practice linked to your selected word is planned for a later increment.
      </p>
    </section>
  );
}
