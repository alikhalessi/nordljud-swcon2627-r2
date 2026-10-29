"use client";

import { useMemo, useState } from "react";
import { useLearningStore, type Sense } from "./learning-state";
import type { Level } from "./learning-app";

type LearningView = "favorites" | "progress" | "history";
type LevelFilter = Level | "All";
const PAGE_SIZE = 10;
const levels: Level[] = ["A2", "B1", "B2", "C1"];

export default function LearningDashboard({
  level, onSelect
}: {
  level: Level;
  onSelect: (sense: Sense, level: Level) => void;
}) {
  const st = useLearningStore();
  const [view, setView] = useState<LearningView>("favorites");
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [page, setPage] = useState(0);

  // Search across the already user-scoped records loaded by the existing
  // Supabase state provider. No new privileged reads or data writes here.
  const query = search.trim().toLocaleLowerCase("sv");
  const favorites = useMemo(() => st.favorites.filter((item) =>
    !query || item.verb.toLocaleLowerCase("sv").includes(query) ||
    item.meaning.toLocaleLowerCase("en").includes(query)
  ), [st.favorites, query]);
  const progress = useMemo(() => st.studied.filter((item) =>
    (levelFilter === "All" || item.level === levelFilter) &&
    (!query || item.verb.toLocaleLowerCase("sv").includes(query) ||
      item.meaning.toLocaleLowerCase("en").includes(query))
  ), [st.studied, levelFilter, query]);
  const history = useMemo(() => st.history.filter((item) =>
    (levelFilter === "All" || item.level === levelFilter) &&
    (!query || item.verb.toLocaleLowerCase("sv").includes(query) ||
      item.meaning.toLocaleLowerCase("en").includes(query))
  ), [st.history, levelFilter, query]);

  const rowCount = view === "favorites" ? favorites.length : view === "progress" ? progress.length : history.length;
  const pageCount = Math.max(1, Math.ceil(rowCount / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const offset = currentPage * PAGE_SIZE;

  function chooseView(next: LearningView) {
    setView(next);
    setSearch("");
    setLevelFilter("All");
    setPage(0);
  }

  return (
    <section className="learning-dashboard" aria-labelledby="saved-heading">
      <div className="section-top">
        <div>
          <span className="eyebrow">YOUR LEARNING</span>
          <h2 id="saved-heading">My Learning Dashboard</h2>
          <p>Find your saved verbs, review completed study, or revisit your practice scores.</p>
        </div>
      </div>

      {!st.user ? (
        <p className="vocabulary-notice">
          Guest Mode: you can study and practice freely, but your progress is not saved permanently.
          Sign in with Google to save and sync your learning.
        </p>
      ) : (
        <>
          <p className="vocabulary-notice" role="status">
            {st.loading ? "Loading your cloud progress…" : "Your learning is saved to your private account."}
          </p>
          {st.error && (
            <p className="vocabulary-notice" role="alert">
              {st.error}{" "}
              <button type="button" onClick={() => void st.refresh()}>Retry sync</button>
            </p>
          )}

          <div className="learning-totals" aria-label="Saved learning totals">
            <div><strong>{st.favorites.length}</strong><span>Favorites</span></div>
            <div><strong>{st.studied.length}</strong><span>Studied entries</span></div>
            <div><strong>{st.history.length}</strong><span>Recent practice results</span></div>
          </div>

          <div className="progress-counters" aria-label="Studied verbs by level">
            {levels.map((item) => (
              <div key={item}>
                <strong>{item}</strong>
                <span>{st.studied.filter((entry) => entry.level === item).length} studied</span>
              </div>
            ))}
          </div>

          <div className="study-mode-tabs learning-view-tabs" role="group" aria-label="Saved learning views">
            <button type="button" className={view === "favorites" ? "active" : ""}
              aria-pressed={view === "favorites"} onClick={() => chooseView("favorites")}>
              Favorites ({st.favorites.length})
            </button>
            <button type="button" className={view === "progress" ? "active" : ""}
              aria-pressed={view === "progress"} onClick={() => chooseView("progress")}>
              Learning Progress ({st.studied.length})
            </button>
            <button type="button" className={view === "history" ? "active" : ""}
              aria-pressed={view === "history"} onClick={() => chooseView("history")}>
              Practice History ({st.history.length})
            </button>
          </div>

          <div className="learning-filters">
            <label>
              Search saved verbs
              <input type="search" value={search} placeholder="Swedish verb or English meaning"
                onChange={(event) => { setSearch(event.target.value); setPage(0); }} />
            </label>
            {view !== "favorites" && (
              <label>
                Filter level
                <select value={levelFilter} onChange={(event) => {
                  setLevelFilter(event.target.value as LevelFilter);
                  setPage(0);
                }}>
                  <option value="All">All levels</option>
                  {levels.map((item) => <option value={item} key={item}>{item}</option>)}
                </select>
              </label>
            )}
          </div>

          <div className="saved-list" aria-live="polite">
            {rowCount === 0 ? (
              <p className="empty-results">
                {query || levelFilter !== "All"
                  ? "No saved items match your filters."
                  : view === "favorites"
                    ? "No favorites yet. Open Explore Your Words and add a verb."
                    : view === "progress"
                      ? "No studied verbs yet. Mark a verb as studied in Explore Your Words."
                      : "No saved practice results yet. Complete a Practice Mode exercise."}
              </p>
            ) : view === "favorites" ? (
              favorites.slice(offset, offset + PAGE_SIZE).map((sense) => (
                <div className="saved-row" key={sense.verb + "|" + sense.meaning}>
                  <span><strong lang="sv">{sense.verb}</strong> · {sense.meaning}</span>
                  <div>
                    <button type="button" onClick={() => onSelect(sense, level)}>Study</button>
                    <button type="button" disabled={st.busy} onClick={() => void st.toggleFavorite(sense)}>Remove</button>
                  </div>
                </div>
              ))
            ) : view === "progress" ? (
              progress.slice(offset, offset + PAGE_SIZE).map((sense) => (
                <div className="saved-row" key={sense.level + "|" + sense.verb + "|" + sense.meaning}>
                  <span><strong>{sense.level}</strong> · <strong lang="sv">{sense.verb}</strong> · {sense.meaning}</span>
                  <div>
                    <button type="button" onClick={() => onSelect(sense, sense.level)}>Study</button>
                    <button type="button" disabled={st.busy} onClick={() => void st.toggleStudied(sense, sense.level)}>Undo studied</button>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p className="detail-footnote">Showing the latest 100 saved practice sessions.</p>
                {history.slice(offset, offset + PAGE_SIZE).map((item) => (
                  <div className="saved-row" key={item.id}>
                    <span>
                      <strong>{item.level} · {item.verb}</strong> ({item.meaning})
                      {" · "}{item.score}/{item.total} · {new Date(item.completed_at).toLocaleString()}
                    </span>
                    <button type="button" disabled={st.busy} onClick={() => void st.deleteHistory(item.id)}>Delete</button>
                  </div>
                ))}
              </>
            )}
          </div>
          {view === "history" && st.history.length > 0 && (
            <button type="button" className="learning-delete-all" disabled={st.busy} onClick={() => {
              if (window.confirm("Delete all your saved practice history?")) void st.clearHistory();
            }}>Delete all practice history</button>
          )}
          <div className="learning-pagination" aria-label="Saved learning pages">
            <span>{rowCount} result{rowCount === 1 ? "" : "s"} · Page {currentPage + 1} of {pageCount}</span>
            <div>
              <button type="button" disabled={currentPage === 0} onClick={() => setPage((value) => Math.max(0, value - 1))}>Previous</button>
              <button type="button" disabled={currentPage + 1 >= pageCount} onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}>Next</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
