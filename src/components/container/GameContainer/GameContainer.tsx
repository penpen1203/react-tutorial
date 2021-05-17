import React, { useReducer } from "react";

import { calculateWinner } from "../../../application/functions";
import { initState } from "../../../application/state";
import { reducer } from "../../../application/reducer";
import { Game } from "../../Game";

export const GameContainer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const current = state.history[state.stepNumber];
  const result = calculateWinner(current.squares);

  return <Game state={state} result={result} dispatch={dispatch} />;
};
