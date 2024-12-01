export interface LetterStats {
  attempts: number;
  successes: number;
}

export interface LetterStatistics {
  [key: string]: LetterStats;
} 