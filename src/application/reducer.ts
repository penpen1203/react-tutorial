import { Action } from "./action";
import { State } from "./state";
import { SquareType } from "./types";
import { Option, some } from "../util/Option";
import { toSquareType } from "./functions";
import { pipe } from "../util/pipe";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "PlaceMark":
      const history = state.history.slice(0, state.stepNumber + 1);
      const currentSquares = history[history.length - 1].squares;

      return {
        history: history.concat([
          {
            squares: currentSquares.reduce(
              (
                acc: ReadonlyArray<Option<SquareType>>,
                cur: Option<SquareType>,
                index: number
              ): ReadonlyArray<Option<SquareType>> => {
                return index === action.index
                  ? [...acc, pipe(toSquareType(state.xIsNext), some)]
                  : [...acc, cur];
              },
              []
            ),
            col: (action.index % 3) + 1,
            row: Math.floor(action.index / 3) + 1,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
      };
    case "JumpHistory":
      return {
        ...state,
        stepNumber: action.step,
        xIsNext: action.step % 2 === 0,
      };
  }
};
