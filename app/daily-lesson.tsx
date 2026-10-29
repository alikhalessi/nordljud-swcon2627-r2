"use client";

import { useEffect, useMemo, useState } from "react";
import type { Level } from "./learning-app";
import { localDateKey, selectDailyVerbs, type DailyVerbEntry } from "../lib/daily-lessons";
import { useReviewStore } from "./review-state";

type DailyResponse = { level: Level; count: number; entries: DailyVerbEntry[] };
type Sense = { verb: string; meaning: string };

export default function DailyLesson({
  level,
  onOpenVerb
}: {
  level: Level;
  onOpenVerb: (sense: Sense, level: Level) => void;
}) {
  const review = useReviewStore();
  const [dayKey, setDayKey] = useState("");
  const [entries, setEntries] = useState<DailyVerbEntry[]>([]);
  const [loadedLevel, setLoadedLevel] = useState<Level | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [audioStatus, setAudioStatus] = useState("");

  // Compute the date on the client: server locale/timezone must not pick
  // a different lesson during hydration. Recheck on tab focus and midnight.
  useEffect(() => {
    const update = () => setDayKey(localDateKey(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    window.addEventListener("focus", update);
    const onVisible = () => { if (!document.hidden) update(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setEntries([]);
    setLoadedLevel(null);
    setLoading(true);
    setError("");
    async function fetchLevel() {
      try {
        const response = await fetch(`/api/verbs?level=${level}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Vocabulary request failed: ${response.status}`);
        const data = await response.json() as DailyResponse;
        if (data.level !== level || !Array.isArray(data.entries) || data.entries.length !== data.count) {
          throw new Error("Daily lesson source did not match the chosen level.");
        }
        if (!controller.signal.aborted) {
          setEntries(data.entries);
          setLoadedLevel(level);
        }
      } catch (cause) {
        if (!controller.signal.aborted) {
          setError(cause instanceof Error ? cause.message : "Could not load today's words.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void fetchLevel();
    return () => controller.abort();
  }, [level, retry]);

  useEffect(() => {
    setAudioStatus("");
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [level, dayKey]);

  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const completedToday = Boolean(dayKey && review.state.completions.some(
    item => item.level === level && item.lessonOn === dayKey
  ));
  const canSaveReview = review.ready && !review.busy &&
    (review.mode === "guest" || review.cloudAvailable);

  const picks = useMemo(
    () => dayKey && loadedLevel === level ? selectDailyVerbs(entries, level, dayKey) : [],
    [dayKey, entries, level, loadedLevel]
  );

  function speak(swedish: string, verb: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined") {
      setAudioStatus("Speech is not supported by this browser.");
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(swedish);
      utterance.lang = "sv-SE";
      utterance.rate = 0.88;
      utterance.onerror = () => setAudioStatus("Audio unavailable. You can still read the Swedish example.");
      utterance.onend = () => setAudioStatus("");
      window.speechSynthesis.speak(utterance);
      setAudioStatus(`Playing Swedish example for ${verb}…`);
    } catch {
      setAudioStatus("Audio unavailable. You can still read the Swedish example.");
    }
  }

  return (
    <section className="daily-lesson" aria-labelledby="daily-lesson-title">
      <div className="daily-lesson-heading">
        <div>
          <span className="eyebrow">A LITTLE SWEDISH EVERY DAY</span>
          <h2 id="daily-lesson-title">Today's Lesson</h2>
          <p>Three Swedish verb meanings selected for your {level} level, refreshed each local calendar day.</p>
          <p className="daily-lesson-note">Daily picks from our existing library—not necessarily new to you, and not a personal mastery recommendation.</p>
        </div>
        {dayKey && (
          <span className="daily-date" aria-label={`Daily lesson date ${dayKey}`}>
            {dayKey}
          </span>
        )}
      </div>
      {!dayKey && <p className="vocabulary-notice" role="status">Preparing today's date…</p>}
      {loading && <p className="vocabulary-notice" role="status">Loading {level} daily verbs…</p>}
      {error && (
        <div role="alert" className="vocabulary-notice vocabulary-recovery">
          <p>{error}</p>
          <button type="button" onClick={() => setRetry((value) => value + 1)}>
            Retry daily lesson
          </button>
        </div>
      )}
      {!loading && !error && dayKey && (
        picks.length === 0 ? (
          <p className="vocabulary-notice">No source verbs with bilingual examples are available for this level.</p>
        ) : (
          <div className="daily-cards">
            {picks.map(({ entry, example }, index) => (
              <article className="daily-card" key={entry.id}>
                <div className="daily-card-top">
                  <span className="eyebrow">WORD {index + 1} OF {picks.length}</span>
                  <span className="daily-card-level">{level}</span>
                </div>
                <h3 lang="sv">{entry.verb}</h3>
                <p className="daily-meaning">{entry.meaning}</p>
                <p className="daily-example" lang="sv">{example.sv}</p>
                <p className="daily-translation">{example.en}</p>
                <div className="daily-actions">
                  <button type="button" onClick={() => speak(example.sv, entry.verb)}
                    aria-label={`Listen to Swedish example for ${entry.verb}: ${entry.meaning}`}>
                    <span aria-hidden="true">♫</span> Listen
                  </button>
                  <button type="button" onClick={() => onOpenVerb({
                    verb: entry.verb, meaning: entry.meaning
                  }, level)}
                    aria-label={`Explore ${entry.verb}, meaning ${entry.meaning}, in Verb Explorer`}>
                    Explore this verb
                  </button>
                  <button type="button"
                    disabled={!review.ready || review.busy || (review.mode==="cloud" && !review.cloudAvailable) ||
                      review.hasReminder({level,verb:entry.verb,meaning:entry.meaning})}
                    onClick={() => void review.addReminder({level,verb:entry.verb,meaning:entry.meaning})}>
                    {review.hasReminder({level,verb:entry.verb,meaning:entry.meaning})?"✓ In My Review":"Remind Me Later"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )
      )}
      {!loading && !error && picks.length > 0 && dayKey && (
        <div className="archive-completion">
          <p>{completedToday
            ? "You marked today's lesson completed (self-reported, not a mastery score)."
            : "Viewing today's words does not automatically mark them studied or completed."}</p>
          <button type="button" disabled={!canSaveReview}
            onClick={() => void review.toggleCompletion(level,dayKey)}>
            {completedToday ? "Undo lesson completion" : "Mark today's lesson as completed"}
          </button>
        </div>
      )}
      <div className="daily-audio-status" role="status" aria-live="polite">{audioStatus}</div>
      {review.error && <p className="vocabulary-notice" role="alert">{review.error}</p>}
    </section>
  );
}
