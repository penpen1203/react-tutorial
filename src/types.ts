export type SquareType = "O" | "X";

export interface HistoryData {
  squares: (SquareType | null)[];
  col: number;
  row: number;
}

export interface GameState {
  history: HistoryData[];
  xIsNext: boolean;
  stepNumber: number;
}

export interface GameResult {
  winner: SquareType | null;
  line: number[];
}
