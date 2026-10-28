"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Level } from "./learning-app";
import LevelComparison from "./level-comparison";
import PracticePanel from "./practice-panel";

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
  const selectedMeaning = useRef<{ verb: string; meaning: string } | null>(null);
  const [entries, setEntries] = useState<VocabularyEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectionNotice, setSelectionNotice] = useState("");
  const [mode, setMode] = useState<"learn" | "practice">("learn");
  const [speechStatus, setSpeechStatus] = useState("");
  const [voiceWarning, setVoiceWarning] = useState("");
  const [activeSpeech, setActiveSpeech] = useState<string | null>(null);
  const speechGeneration = useRef(0);

  function stopSpeaking() {
    speechGeneration.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeech(null);
    setSpeechStatus("Audio stopped.");
    setVoiceWarning("");
  }

  function speakSwedish(text: string, label: string) {
    const phrase = text.trim();
    if (!phrase) {
      setSpeechStatus("No Swedish text is provided for this example.");
      return;
    }
    if (typeof window === "undefined" ||
        !("speechSynthesis" in window) ||
        typeof SpeechSynthesisUtterance === "undefined") {
      setSpeechStatus("Speech playback is not supported in this browser.");
      setVoiceWarning("");
      return;
    }

    const engine = window.speechSynthesis;
    const run = ++speechGeneration.current;
    engine.cancel();

    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = "sv-SE";
    utterance.rate = 0.88;
    const available = engine.getVoices();
    const swedish = available.find((voice) => /^sv(?:-|$)/i.test(voice.lang));
    if (swedish) utterance.voice = swedish;
    setVoiceWarning(
      !swedish && available.length > 0
        ? "No Swedish voice is installed or available in this browser. It may use a different accent."
        : !swedish
          ? "The browser has not listed any voices yet. Check your device's Swedish speech settings if audio fails."
          : ""
    );

    utterance.onstart = () => {
      if (run === speechGeneration.current) {
        setActiveSpeech(label);
        setSpeechStatus(`Playing: ${label}`);
      }
    };
    utterance.onend = () => {
      if (run === speechGeneration.current) {
        setActiveSpeech(null);
        setSpeechStatus(`Finished: ${label}`);
      }
    };
    utterance.onerror = (event) => {
      if (run === speechGeneration.current && event.error !== "canceled" && event.error !== "interrupted") {
        setActiveSpeech(null);
        setSpeechStatus("Unable to play this Swedish audio. Check your browser's speech settings.");
      }
    };

    setSpeechStatus(`Starting audio: ${label}`);
    setActiveSpeech(label);
    try {
      engine.speak(utterance);
    } catch {
      if (run === speechGeneration.current) {
        setActiveSpeech(null);
        setSpeechStatus("The browser could not start audio playback.");
      }
    }
  }

  // Clean up browser speech when switching levels/verbs or leaving the page.
  useEffect(() => {
    speechGeneration.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeech(null);
    setSpeechStatus("");
    setVoiceWarning("");
  }, [level, selectedId]);

  useEffect(() => () => {
    speechGeneration.current += 1;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  function setSelectedEntry(rows: VocabularyEntry[]) {
    const previous = selectedMeaning.current;
    const index = previous
      ? rows.findIndex((row) => row.verb === previous.verb && row.meaning === previous.meaning)
      : -1;
    const nextIndex = index >= 0 ? index : 0;
    const next = rows[nextIndex];
    if (next) selectedMeaning.current = { verb: next.verb, meaning: next.meaning };
    setSelectedId(next?.id ?? null);
    setPage(Math.floor(nextIndex / PAGE_SIZE));
    setSelectionNotice(previous && index < 0
      ? `The same meaning of ${previous.verb} is unavailable at this level; another verb was selected.`
      : "");
  }

  useEffect(() => {
    // Preserve Swedish lemma AND English sense; duplicated verb spellings are distinct entries.
    setQuery("");
    const cached = cachedLevels.current[level];
    if (cached) {
      setEntries(cached);
      setSelectedEntry(cached);
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
        setSelectedEntry(payload.entries);
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
            {selectionNotice && <p className="vocabulary-notice" role="status">{selectionNotice}</p>}
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
                      onClick={() => {
                        selectedMeaning.current = { verb: item.verb, meaning: item.meaning };
                        setSelectedId(item.id);
                        setSelectionNotice("");
                      }}
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
                  <div className="detail-audio-actions">
                    <button
                      type="button"
                      className="speech-control"
                      onClick={() => speakSwedish(chosen.verb, `verb ${chosen.verb}`)}
                      aria-label={`Listen to ${chosen.verb} in Swedish`}
                    >
                      <span aria-hidden="true">♫</span> Listen to verb
                    </button>
                    {activeSpeech && (
                      <button type="button" className="speech-stop" onClick={stopSpeaking}>
                        Stop audio
                      </button>
                    )}
                  </div>
                  <div className="vocabulary-audio-status" aria-live="polite" aria-atomic="true">
                    {speechStatus && <p>{speechStatus}</p>}
                    {voiceWarning && <p className="voice-warning">{voiceWarning}</p>}
                  </div>
                </div>
                <div className="study-mode-tabs" role="group" aria-label="Study mode">
                  <button
                    type="button"
                    className={mode === "learn" ? "active" : ""}
                    aria-pressed={mode === "learn"}
                    onClick={() => setMode("learn")}
                  >Learning Mode</button>
                  <button
                    type="button"
                    className={mode === "practice" ? "active" : ""}
                    aria-pressed={mode === "practice"}
                    onClick={() => setMode("practice")}
                  >Practice Mode</button>
                </div>
                {mode === "learn" ? (
                  <>
                    <p className="study-mode-help">
                      Study this verb's forms and Swedish examples, listen to its pronunciation,
                      and compare the same meaning across four levels.
                    </p>
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
                        <div className="form-audio-actions">
                          {form?.word?.trim() && (
                            <button
                              type="button"
                              className="speech-control"
                              onClick={() => speakSwedish(form.word!, `${label.toLowerCase()} form`)}
                              aria-label={`Listen to ${label.toLowerCase()} form ${form.word} in Swedish`}
                            >
                              <span aria-hidden="true">♫</span> Form
                            </button>
                          )}
                          {form?.sv?.trim() && (
                            <button
                              type="button"
                              className="speech-control"
                              onClick={() => speakSwedish(form.sv!, `${label.toLowerCase()} example`)}
                              aria-label={`Listen to ${label.toLowerCase()} Swedish example`}
                            >
                              <span aria-hidden="true">♫</span> Example
                            </button>
                          )}
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
                <LevelComparison
                  verb={chosen.verb}
                  meaning={chosen.meaning}
                  currentLevel={level}
                  speak={speakSwedish}
                />
                  </>
                ) : (
                  <PracticePanel key={level + ":" + chosen.id} level={level} entry={chosen} pool={entries} />
                )}
              </>
            ) : (
              <p className="empty-results">Select a verb to see its forms and examples.</p>
            )}
          </div>
        </div>
      )}
      <p className="vocabulary-explanation">
        The original mini lesson below still uses a fixed example for each level.
        The new Learning and Practice Modes above follow the verb you selected.
        Scores are not yet saved to an account.
      </p>
    </section>
  );
}
