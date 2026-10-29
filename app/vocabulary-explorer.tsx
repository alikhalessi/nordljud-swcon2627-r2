"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Level } from "./learning-app";
import LevelComparison from "./level-comparison";
import PracticePanel from "./practice-panel";
import { isAvailableFormWord } from "../lib/practice-engine.mjs";
import VerbPhoto, { hasVerbPhoto } from "./verb-photo";
import {useLearningStore} from "./learning-state";
import { readGuestPreferences, updateGuestPreferences } from "../lib/guest-preferences";

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

export default function VocabularyExplorer({ level, target }: { level: Level;target?:{verb:string;meaning:string;level:Level}|null }) {
  const store=useLearningStore();
  const cachedLevels = useRef<Partial<Record<Level, VocabularyEntry[]>>>({});
  const selectedMeaning = useRef<{ verb: string; meaning: string } | null>(null);
  const [entries, setEntries] = useState<VocabularyEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [photosOnly, setPhotosOnly] = useState(false);
  const [favoritesOnly,setFavoritesOnly]=useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadedLevel, setLoadedLevel] = useState<Level | null>(null);
  const [retryToken, setRetryToken] = useState(0);
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

  // The persisted guest preferences include only the selected sense and mode.
  // Restore before the initial asynchronous vocabulary request resolves.
  useEffect(() => {
    const preferences = readGuestPreferences();
    if (preferences) {
      if (preferences.verb && preferences.meaning) {
        selectedMeaning.current = { verb: preferences.verb, meaning: preferences.meaning };
      }
      setMode(preferences.mode);
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
      setLoadedLevel(level);
      setSelectedEntry(cached);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();
    setEntries([]);
    setLoadedLevel(null);
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
        setLoadedLevel(level);
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
  }, [level, retryToken]);
  useEffect(()=>{
    if(!target||target.level!==level||entries.length===0)return;
    const index=entries.findIndex(x=>x.verb===target.verb&&x.meaning===target.meaning);
    if(index<0)return;
    selectedMeaning.current={verb:target.verb,meaning:target.meaning};
    setSelectedId(entries[index].id);setFavoritesOnly(false);setPhotosOnly(false);setQuery("");setPage(Math.floor(index/PAGE_SIZE));
  },[target,level,entries]);

  const photoCount = useMemo(() =>
    entries.filter(({ verb, meaning }) => hasVerbPhoto(verb, meaning)).length,
    [entries]
  );
  const matching = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("sv");
    return entries.filter(({ verb, meaning }) =>
      (!photosOnly || hasVerbPhoto(verb, meaning)) &&
      (!favoritesOnly || store.favorites.some(f=>f.verb===verb&&f.meaning===meaning)) &&
      (!term || verb.toLocaleLowerCase("sv").includes(term) ||
        meaning.toLocaleLowerCase("en").includes(term))
    );
  }, [entries, query, photosOnly, favoritesOnly, store.favorites]);

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const pageEntries = matching.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const chosen = entries.find((row) => row.id === selectedId);
  const selectionOutsideResults = Boolean(chosen && !matching.some((item) => item.id === selectedId));

  useEffect(() => {
    if (!chosen || loadedLevel !== level) return;
    updateGuestPreferences({
      level,
      verb: chosen.verb,
      meaning: chosen.meaning,
      mode
    });
  }, [chosen, loadedLevel, level, mode]);
  const chosenSaved=chosen?store.favorites.some(x=>x.verb===chosen.verb&&x.meaning===chosen.meaning):false;
  const chosenStudied=chosen?store.studied.some(x=>x.level===level&&x.verb===chosen.verb&&x.meaning===chosen.meaning):false;

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
      {error && <div className="vocabulary-notice vocabulary-recovery" role="alert">
        <p>Could not load the vocabulary. {error}</p>
        <button type="button" disabled={loading} onClick={() => setRetryToken((value) => value + 1)}>
          Retry loading {level}
        </button>
      </div>}

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
            <label className="vocabulary-photo-filter">
              <input
                type="checkbox"
                checked={photosOnly}
                onChange={(event) => {
                  setPhotosOnly(event.target.checked);
                  setPage(0);
                }}
              />
              <span>Only verbs with photos <strong>({photoCount} available)</strong></span>
            </label>
            {store.user&&<label className="vocabulary-photo-filter"><input type="checkbox" checked={favoritesOnly} onChange={e=>{setFavoritesOnly(e.target.checked);setPage(0);}}/> Show favorites only</label>}
            <p className="vocabulary-results" role="status">
              {matching.length} {matching.length === 1 ? "entry" : "entries"} found
              {matching.length !== entries.length ? ` from ${entries.length}` : ""}
            </p>

            {selectionOutsideResults && (
              <p className="vocabulary-notice selection-outside-results" role="status">
                Your selected word is outside your current results. The detail panel still shows your previous selection.
                <button type="button" onClick={() => {
                  setQuery("");
                  setPhotosOnly(false);
                  setFavoritesOnly(false);
                  setPage(0);
                }}>Clear filters</button>
              </p>
            )}

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
                <div className={"detail-heading" + (mode === "learn" && hasVerbPhoto(chosen.verb, chosen.meaning) ? " with-visual" : "")}>
                  <div className="detail-heading-copy">
                    <span className="eyebrow">SELECTED VERB · {level}</span>
                  <h3 lang="sv">{chosen.verb}</h3>
                  <p><strong>English meaning:</strong> {chosen.meaning}</p>
                  <div className="saved-actions">
                   <button type="button" disabled={!store.user||store.busy||store.loading} onClick={()=>void store.toggleFavorite({verb:chosen.verb,meaning:chosen.meaning})}>{chosenSaved?"★ Remove Favorite":"☆ Add to Favorites"}</button>
                   <button type="button" disabled={!store.user||store.busy||store.loading} onClick={()=>void store.toggleStudied({verb:chosen.verb,meaning:chosen.meaning},level)}>{chosenStudied?"✓ Studied — undo":"Mark as studied"}</button>
                  </div>
                  {!store.user&&<p className="detail-footnote">Guest Mode: sign in to save favorites and studied words.</p>}
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
                  {mode === "learn" && hasVerbPhoto(chosen.verb, chosen.meaning) && (
                    <VerbPhoto
                      key={chosen.verb + ":" + chosen.meaning}
                      verb={chosen.verb}
                      meaning={chosen.meaning}
                    />
                  )}
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
                          <strong lang="sv">{isAvailableFormWord(form?.word) ? form!.word : "Form not available"}</strong>
                        </div>
                        <div className="form-audio-actions">
                          {isAvailableFormWord(form?.word) && (
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
                  These examples come from the original project dataset; automated validation does not certify their Swedish linguistic accuracy.
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
        The fixed mini lesson is in Your Learning → Today's Lesson, alongside three daily picks.
        Learning and Practice Modes here follow the verb you selected.
        Signed-in users can save favorite words, studied verbs and completed practice sessions.
      </p>
    </section>
  );
}
