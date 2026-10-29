export type PracticeEntry = {
  id: string;
  verb: string;
  meaning: string;
  forms: Record<string, { word?: string; sv?: string; en?: string }>;
};

export type PracticeQuestion = {
  id: string;
  kind: "meaning" | "form" | "cloze";
  title: string;
  prompt: string;
  context: string;
  choices: string[];
  answer: string;
  explanation: string;
};

export function isAvailableFormWord(word: string | null | undefined): boolean;

export function makePracticeQuestions(entry: PracticeEntry, pool: PracticeEntry[]): PracticeQuestion[];

export function canRevealCorrectAnswer(selected: string | null, answer: string, revealed: boolean, solved: boolean): boolean;
