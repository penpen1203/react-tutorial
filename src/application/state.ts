import { SquareType } from "./types";

export interface HistoryData {
  readonly squares: (SquareType | null)[];
  readonly col: number;
  readonly row: number;
}

export interface State {
  readonly history: HistoryData[];
  readonly xIsNext: boolean;
  readonly stepNumber: number;
}

export const initState: State = {
  history: [
    {
      squares: Array(9).fill(null),
      col: 0,
      row: 0,
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};
