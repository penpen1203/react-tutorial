import { GameResult, SquareType } from "./types";
import { Option, map, isSome, eq } from "../util/Option";
import { pipe } from "../util/pipe";
import { find } from "../util/ReadonlyArray";

export const toSquareType = (xIsNext: boolean): SquareType =>
  xIsNext ? "O" : "X";

export const calculateWinner = (
  squares: ReadonlyArray<Option<SquareType>>
): Option<GameResult> => {
  const lines: ReadonlyArray<ReadonlyArray<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return pipe(
    lines,
    find(
      ([a, b, c]) =>
        pipe(squares[a], isSome) &&
        pipe(squares[a], eq(squares[b])) &&
        pipe(squares[a], eq(squares[c]))
    ),
    map(([a, b, c]) => {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    })
  );
};
