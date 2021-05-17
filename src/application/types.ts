import { Option } from "../util/Option";

export type SquareType = "O" | "X";

export interface GameResult {
  readonly winner: Option<SquareType>;
  readonly line: number[];
}
