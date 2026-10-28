"use client";

import { useMemo, useState } from "react";
import type { Level } from "./learning-app";
import { makePracticeQuestions, type PracticeEntry } from "../lib/practice-engine.mjs";

export default function PracticePanel({
  entry, pool, level
}: {
  entry: PracticeEntry;
  pool: PracticeEntry[];
  level: Level;
}) {
  const questions = useMemo(() => makePracticeQuestions(entry, pool), [entry, pool]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(false);

  const finished = step >= questions.length;
  const question = questions[step];
  const isCorrect = selected !== null && question && selected === question.answer;

  function choose(value: string) {
    if (!question || solved) return;
    setSelected(value);
    if (value === question.answer) {
      setSolved(true);
      setScore((current) => current + 1);
    }
  }

  function next() {
    setStep((current) => current + 1);
    setSelected(null);
    setSolved(false);
  }

  function restart() {
    setStep(0);
    setScore(0);
    setSelected(null);
    setSolved(false);
  }

  return (
    <section className="guided-practice" aria-label={"Practice " + entry.verb + " at level " + level}>
      <p className="guided-summary">
        Practice <strong lang="sv">{entry.verb}</strong> ({entry.meaning}) at <strong>{level}</strong>.
        Questions use the same entry you selected in the Vocabulary Explorer.
      </p>

      {!questions.length ? (
        <p className="vocabulary-notice">
          This verb does not have enough distinct source forms or meanings for a reliable
          multiple-choice question. You can still study it in Learning Mode.
        </p>
      ) : finished ? (
        <div className="practice-finish" role="status">
          <span className="eyebrow">PRACTICE FINISHED</span>
          <h4>You answered {score} of {questions.length} questions correctly.</h4>
          <p>The result stays on this screen only. Saving progress will come in a later version.</p>
          <button type="button" className="practice-next" onClick={restart}>Practice again</button>
        </div>
      ) : question ? (
        <>
          <div className="practice-progress">
            <span>Question {step + 1} of {questions.length}</span>
            <span>{score} correct</span>
          </div>
          <h4>{question.title}</h4>
          <p className="practice-question">{question.prompt}</p>
          {question.context && <p className="practice-context" lang="sv">{question.context}</p>}

          <div className="practice-answers" role="group" aria-label="Choose your answer">
            {question.choices.map((option, index) => (
              <button
                type="button"
                key={option}
                disabled={solved}
                aria-pressed={selected === option}
                className={"practice-answer " + (selected === option
                  ? isCorrect ? "answer-correct" : "answer-wrong"
                  : "")}
                onClick={() => choose(option)}
              >
                <span className="practice-choice-index">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className={"practice-feedback " + (isCorrect ? "correct" : "incorrect")} role="status">
              <strong>
                {isCorrect
                  ? "Correct — nice work!"
                  : "Not quite. Try another answer, or go to the next question."}
              </strong>
              {isCorrect && (
                <p className="practice-explanation">{question.explanation}</p>
              )}
            </div>
          )}

          <div className="practice-navigation">
            {selected !== null && !solved && (
              <button type="button" className="practice-retry" onClick={() => setSelected(null)}>
                Try again
              </button>
            )}
            {selected !== null && (
              <button type="button" className="practice-next" onClick={next}>
                {step + 1 < questions.length ? "Next question" : "See result"}
              </button>
            )}
          </div>
          <p className="detail-footnote">
            These exercises use the existing vocabulary, not generated example sentences.
            Change the selected verb or level to start a new set.
          </p>
        </>
      ) : null}
    </section>
  );
}
