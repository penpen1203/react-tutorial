import { GameState } from "./types";

export const initState: GameState = {
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
