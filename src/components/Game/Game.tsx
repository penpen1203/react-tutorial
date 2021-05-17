import React from "react";
import "./Game.css";

import { GameResult } from "../../application/types";
import { Board } from "../Board";
import { Action, jumpHistory, placeMark } from "../../application/action";
import { HistoryData, State } from "../../application/state";
import { fold, getOrElse, map, Option, toNullable } from "../../util/Option";
import { pipe } from "../../util/pipe";
import { toSquareType } from "../../application/functions";

const renderGame = (state: State, dispatch: (action: Action) => void) => {
  return state.history.map((step, move) => {
    return (
      <li key={move}>
        <button
          onClick={() => dispatch(jumpHistory(move))}
          className={state.stepNumber === move ? "bold" : ""}
        >
          {toDescription(step, move)}
        </button>
      </li>
    );
  });
};

const toDescription = (step: HistoryData, move: number): string =>
  move
    ? "Go to move #" + move + "(" + step.col + "," + step.row + ")"
    : "Go to game start";

const toStatus = (maybeResult: Option<GameResult>, state: State): string => {
  return pipe(
    maybeResult,
    fold({
      onNone: () => "Next player: " + toSquareType(state.xIsNext),
      onSome: (result) => "Winner: " + pipe(result.winner, toNullable),
    })
  );
};

export interface GameProps {
  state: State;
  maybeResult: Option<GameResult>;
  dispatch: (action: Action) => void;
}

export const Game: React.FC<GameProps> = ({ state, maybeResult, dispatch }) => {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.stepNumber].squares}
          onClick={(index) => dispatch(placeMark(index))}
          highlightCells={pipe(
            maybeResult,
            map((result) => result.line),
            getOrElse(() => [] as number[])
          )}
        />
      </div>
      <div className="game-info">
        <div>{toStatus(maybeResult, state)}</div>
        <ol>{renderGame(state, dispatch)}</ol>
      </div>
    </div>
  );
};
