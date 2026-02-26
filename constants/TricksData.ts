// Mocked trick data — populated in a future step.
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type Trick = {
  id: string;
  name: string;
  category: 'Basic Obedience' | 'Puppy Tricks' | 'Advanced';
  difficulty: Difficulty;
  steps: string[];
};

export const TRICKS_DATA: Trick[] = [];
