import LearningApp, { type Lesson, type Level } from "./learning-app";
import seeds from "../shared-content/mission-seeds.json";
import a2 from "../shared-content/verb-library/A2.json";
import b1 from "../shared-content/verb-library/B1.json";
import b2 from "../shared-content/verb-library/B2.json";
import c1 from "../shared-content/verb-library/C1.json";

type SourceRecord = {
  v: string;
  meaning: string;
  forms: Record<string, { word?: string; sv?: string; en?: string }>;
};

const source: Record<Level, SourceRecord[]> = {
  A2: a2,
  B1: b1,
  B2: b2,
  C1: c1
};

const baseLessons = seeds.missions.map((seed) => {
  const level = seed.level as Level;
  const entry = source[level]?.find((item) => item.v === seed.verb);
  const example = entry?.forms.Pres;

  if (!entry || !example?.sv || !example.en) {
    throw new Error(`Missing bilingual present-tense example for ${seed.level}/${seed.verb}`);
  }

  return {
    id: seed.id,
    level,
    title: seed.title,
    goal: seed.learnerGoal,
    verb: entry.v,
    meaning: entry.meaning,
    swedish: example.sv,
    english: example.en
  };
});

const lessons: Lesson[] = baseLessons.map((lesson, index) => {
  const others = baseLessons
    .filter((candidate) => candidate.level !== lesson.level)
    .slice(0, 2)
    .map((candidate) => candidate.english);
  const choices = [...others];
  choices.splice(index % 3, 0, lesson.english);

  return { ...lesson, choices };
});

export default function Home() {
  return <LearningApp lessons={lessons} />;
}
