import React from "react";
import "./Game.css";

import { GameResult } from "../../application/types";
import { Board } from "../Board";
import { Action, jumpHistory, placeMark } from "../../application/action";
import { HistoryData, State } from "../../application/state";

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

const toStatus = (result: GameResult | null, state: State): string => {
  if (result) {
    return "Winner: " + result.winner;
  } else {
    return "Next player: " + (state.xIsNext ? "X" : "O");
  }
};

export interface GameProps {
  state: State;
  result: GameResult | null;
  dispatch: (action: Action) => void;
}

export const Game: React.FC<GameProps> = ({ state, result, dispatch }) => {
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.stepNumber].squares}
          onClick={(index) => dispatch(placeMark(index))}
          highlightCells={result ? result.line : []}
        />
      </div>
      <div className="game-info">
        <div>{toStatus(result, state)}</div>
        <ol>{renderGame(state, dispatch)}</ol>
      </div>
    </div>
  );
};
