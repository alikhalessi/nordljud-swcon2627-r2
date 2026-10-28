"use client";

import { useState } from "react";

export type Level = "A2" | "B1" | "B2" | "C1";

export type Lesson = {
  id: string;
  level: Level;
  title: string;
  goal: string;
  verb: string;
  meaning: string;
  swedish: string;
  english: string;
  choices: string[];
};

const levels: Level[] = ["A2", "B1", "B2", "C1"];

const levelDescriptions: Record<Level, string> = {
  A2: "Everyday basics",
  B1: "Growing confidence",
  B2: "More complex ideas",
  C1: "Advanced expressions"
};

export default function LearningApp({ lessons }: { lessons: Lesson[] }) {
  const [level, setLevel] = useState<Level>("A2");
  const [selected, setSelected] = useState<string | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");

  const lesson = lessons.find((entry) => entry.level === level);

  if (!lesson) {
    return <main className="shell">A lesson could not be loaded.</main>;
  }

  const currentSentence = lesson.swedish;
  const correct = selected === lesson.english;

  function changeLevel(next: Level) {
    setLevel(next);
    setSelected(null);
    setShowTranslation(false);
    setAudioMessage("");
  }

  function playSwedish() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioMessage("Swedish speech is not supported by this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentSentence);
    utterance.lang = "sv-SE";
    utterance.rate = 0.88;
    utterance.onerror = () =>
      setAudioMessage("Audio could not be played here. You can still read the sentence.");
    utterance.onend = () => setAudioMessage("");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setAudioMessage("Playing Swedish...");
  }

  return (
    <div className="site">
      <header className="site-header">
        <div className="brand" aria-label="Nordljud home">
          <span className="brand-symbol" aria-hidden="true">N</span>
          <span>Nordljud</span>
        </div>
        <span className="header-note">Learn Swedish, one step at a time</span>
      </header>

      <main className="shell">
        <section className="intro">
          <span className="eyebrow">A SMALL STEP EVERY DAY</span>
          <h1>Make Swedish feel a little more familiar.</h1>
          <p>
            Choose a level, read a real Swedish example, and try a quick
            question. There is no account or setup needed for this first lesson.
          </p>
        </section>

        <section aria-labelledby="levels-heading" className="levels-section">
          <div className="section-top">
            <h2 id="levels-heading">Choose your level</h2>
            <span>Four paths to explore</span>
          </div>
          <div className="level-grid">
            {levels.map((item) => (
              <button
                key={item}
                type="button"
                className={`level-card ${item === level ? "active" : ""}`}
                aria-pressed={item === level}
                onClick={() => changeLevel(item)}
              >
                <span className="level-name">{item}</span>
                <span className="level-description">{levelDescriptions[item]}</span>
                <span className="level-indicator" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="lesson" aria-labelledby="lesson-heading">
          <div className="lesson-head">
            <div>
              <span className="eyebrow">YOUR {level} LESSON</span>
              <h2 id="lesson-heading">{lesson.title}</h2>
              <p>{lesson.goal}</p>
            </div>
            <span className="lesson-pill">Mini lesson</span>
          </div>

          <div className="sentence-card">
            <div className="sentence-top">
              <span>READ IN SWEDISH</span>
              <span className="language-tag">SV</span>
            </div>
            <p className="swedish" lang="sv">{lesson.swedish}</p>
            <div className="word-note">
              Today&apos;s verb: <strong lang="sv">{lesson.verb}</strong>
              <span> · {lesson.meaning}</span>
            </div>
            <div className="sentence-actions">
              <button className="subtle-button" type="button" onClick={playSwedish}>
                <span aria-hidden="true">♫</span> Listen in Swedish
              </button>
              <button
                className="subtle-button"
                type="button"
                onClick={() => setShowTranslation((current) => !current)}
                aria-expanded={showTranslation}
              >
                {showTranslation ? "Hide translation" : "Show translation"}
              </button>
            </div>
            {showTranslation && (
              <p className="translation"><strong>English:</strong> {lesson.english}</p>
            )}
            {audioMessage && <p className="audio-message" role="status">{audioMessage}</p>}
          </div>

          <div className="quiz">
            <div className="quiz-label">
              <span className="quiz-number">01</span>
              <span>QUICK PRACTICE</span>
            </div>
            <h3>What does this Swedish sentence mean?</h3>
            <p className="quiz-hint">Choose the best English translation.</p>
            <div className="choices">
              {lesson.choices.map((choice, index) => (
                <button
                  type="button"
                  key={choice}
                  className={`choice ${selected === choice ? (correct ? "is-correct" : "is-incorrect") : ""}`}
                  onClick={() => setSelected(choice)}
                  disabled={selected !== null}
                  aria-pressed={selected === choice}
                >
                  <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                  <span>{choice}</span>
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className={`feedback ${correct ? "feedback-good" : "feedback-try"}`} role="status">
                <strong>{correct ? "That’s right!" : "Not quite, but keep going."}</strong>
                <span>
                  {correct
                    ? "You matched the Swedish sentence with its English meaning."
                    : "You can see the English translation above, or try the question again."}
                </span>
                <button
                  type="button"
                  className="reset-button"
                  onClick={() => setSelected(null)}
                >
                  Try again
                </button>
              </div>
            )}
          </div>
        </section>

        <footer>
          <span>Nordljud · First learning prototype</span>
          <span>Educational examples are from the shared project dataset.</span>
        </footer>
      </main>
    </div>
  );
}
