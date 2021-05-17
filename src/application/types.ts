export type SquareType = "O" | "X";

export interface GameResult {
  readonly winner: SquareType | null;
  readonly line: number[];
}
