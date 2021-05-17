import { SquareType } from "./types";
import { none, Option } from "../util/Option";

export interface HistoryData {
  readonly squares: ReadonlyArray<Option<SquareType>>;
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
      squares: Array(9).fill(none),
      col: 0,
      row: 0,
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};
