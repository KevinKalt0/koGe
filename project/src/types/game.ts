export interface Player {
  id: number;
  name: string;
  word: string;
  isUndercover: boolean;
  isEliminated: boolean;
}

export type GamePhase = 'setup' | 'playing' | 'voting' | 'ended';
export type GameResult = 'undercover' | 'citizens' | null;