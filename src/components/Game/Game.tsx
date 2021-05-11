import React, { useState } from "react";
import "./Game.css";

import { initState } from "../../initState";
import { GameState, GameResult } from "../../types";
import { Board } from "../../components/Board";
import { calculateWinner } from "../../functions";

const handleClick = (
  i: number,
  state: GameState,
  setState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  const history = state.history.slice(0, state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? "X" : "O";
  setState({
    history: history.concat([
      {
        squares: squares,
        col: (i % 3) + 1,
        row: Math.floor(i / 3) + 1,
      },
    ]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext,
  });
};

const jumpTo = (
  step: number,
  state: GameState,
  setState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  setState({
    ...state,
    stepNumber: step,
    xIsNext: step % 2 === 0,
  });
};

const renderGame = (
  state: GameState,
  setState: React.Dispatch<React.SetStateAction<GameState>>
) => {
  return state.history.map((step, move) => {
    const desc = move
      ? "Go to move #" + move + "(" + step.col + "," + step.row + ")"
      : "Go to game start";
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move, state, setState)}
          className={state.stepNumber === move ? "bold" : ""}
        >
          {desc}
        </button>
      </li>
    );
  });
};

const toStatus = (result: GameResult | null, state: GameState): string => {
  if (result) {
    return "Winner: " + result.winner;
  } else {
    return "Next player: " + (state.xIsNext ? "X" : "O");
  }
};

export const Game: React.FC = () => {
  const [state, setState] = useState(initState);

  const current = state.history[state.stepNumber];
  const result = calculateWinner(current.squares);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i, state, setState)}
          highlightCells={result ? result.line : []}
        />
      </div>
      <div className="game-info">
        <div>{toStatus(result, state)}</div>
        <ol>{renderGame(state, setState)}</ol>
      </div>
    </div>
  );
};
