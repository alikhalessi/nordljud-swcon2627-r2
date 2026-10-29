"use client";

import { useState } from "react";
import { useLearningStore, type Sense } from "./learning-state";
import type { Level } from "./learning-app";

export default function LearningDashboard({
  level, onSelect
}: {
  level: Level;
  onSelect: (sense: Sense, level: Level) => void;
}) {
  const st = useLearningStore();
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<"favorites" | "history">("favorites");
  const levels: Level[] = ["A2", "B1", "B2", "C1"];
  const studiedTotal = st.studied.length;

  return (
    <section className="learning-dashboard" aria-labelledby="saved-heading">
      <div className="learning-dashboard-top">
        <div className="learning-dashboard-heading">
          <span className="eyebrow">YOUR LEARNING</span>
          <h2 id="saved-heading">Saved learning & favorites</h2>
        </div>
        <button
          type="button"
          className="learning-dashboard-toggle"
          aria-expanded={expanded}
          aria-controls="saved-learning-panel"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Hide your learning" : "Show your learning"}
          <span className={"learning-dashboard-chevron" + (expanded ? " open" : "")} aria-hidden="true">⌄</span>
        </button>
      </div>

      <p className="learning-dashboard-summary" role="status">
        {st.user
          ? st.loading
            ? "Loading your saved learning…"
            : `${st.favorites.length} favorites · ${studiedTotal} studied entries · ${st.history.length} recent practice results`
          : "Guest Mode · study freely; progress is not saved permanently"}
      </p>

      {expanded && (
        <div className="learning-dashboard-body" id="saved-learning-panel">
          {!st.user ? (
            <p className="vocabulary-notice">
              Guest Mode: you can study and practice freely, but your progress is not saved permanently.
              Sign in to sync your results.
            </p>
          ) : (
            <>
              <p className="vocabulary-notice">
                {st.loading
                  ? "Loading your cloud progress…"
                  : "Saved to your private Supabase account. Refresh or sign in on another device to see it."}
              </p>
              {st.error && (
                <p className="vocabulary-notice" role="alert">
                  {st.error}{" "}
                  <button type="button" onClick={() => void st.refresh()}>Retry sync</button>
                </p>
              )}
              <div className="progress-counters">
                {levels.map((item) => (
                  <div key={item}>
                    <strong>{item}</strong>
                    <span>{st.studied.filter((entry) => entry.level === item).length} / 456 studied</span>
                  </div>
                ))}
              </div>
              <div className="study-mode-tabs" role="group" aria-label="Saved learning views">
                <button
                  type="button"
                  className={tab === "favorites" ? "active" : ""}
                  aria-pressed={tab === "favorites"}
                  onClick={() => setTab("favorites")}
                >
                  Favorites ({st.favorites.length})
                </button>
                <button
                  type="button"
                  className={tab === "history" ? "active" : ""}
                  aria-pressed={tab === "history"}
                  onClick={() => setTab("history")}
                >
                  Practice history ({st.history.length})
                </button>
              </div>
              {tab === "favorites" ? (
                <div className="saved-list" aria-label="Saved favorite verbs">
                  {st.favorites.length === 0 ? (
                    <p>No favorites saved yet. Select a verb and click ☆ Add to Favorites.</p>
                  ) : st.favorites.map((sense) => (
                    <div className="saved-row" key={sense.verb + "|" + sense.meaning}>
                      <span><strong lang="sv">{sense.verb}</strong> · {sense.meaning}</span>
                      <div>
                        <button type="button" disabled={st.busy} onClick={() => onSelect(sense, level)}>Study</button>
                        <button type="button" disabled={st.busy} onClick={() => void st.toggleFavorite(sense)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="saved-list" aria-label="Saved practice history">
                  {st.history.length === 0 ? (
                    <p>No saved practice sessions yet.</p>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled={st.busy}
                        onClick={() => {
                          if (window.confirm("Delete all your saved practice history?")) void st.clearHistory();
                        }}
                      >
                        Delete all practice history
                      </button>
                      {st.history.map((entry) => (
                        <div className="saved-row" key={entry.id}>
                          <span>
                            <strong>{entry.level} · {entry.verb}</strong> ({entry.meaning})
                            {" · "}{entry.score}/{entry.total} · {new Date(entry.completed_at).toLocaleString()}
                          </span>
                          <button type="button" disabled={st.busy} onClick={() => void st.deleteHistory(entry.id)}>
                            Delete
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
