export interface Verdict {
  blameA: number;
  blameB: number;
  analysis: string;
  advice: string;
  winner?: 'A' | 'B' | 'Tie';
}

export interface CaseData {
  nameA: string;
  nameB: string;
  context: string;
  storyA: string;
  storyB: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  TRANSCRIBING_A = 'TRANSCRIBING_A',
  TRANSCRIBING_B = 'TRANSCRIBING_B',
  JUDGING = 'JUDGING',
}
