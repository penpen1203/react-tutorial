import React from "react";

import { Square } from "../Square";
import { SquareType } from "../../application/types";
import { Option } from "../../util/Option";

export interface BoardProps {
  squares: ReadonlyArray<Option<SquareType>>;
  onClick: (i: number) => void;
  highlightCells: number[];
}

export const renderSquare = (
  squares: ReadonlyArray<Option<SquareType>>,
  onClick: (i: number) => void,
  i: number,
  isHighlight: boolean = false
) => {
  return (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
      isHighlight={isHighlight}
    />
  );
};

export const Board: React.FC<BoardProps> = ({
  squares,
  onClick,
  highlightCells,
}) => {
  return (
    <div>
      {[...Array(3)].map((_, i) => {
        return (
          <div className="board-row" key={i}>
            {[...Array(3)].map((_, j) => {
              return renderSquare(
                squares,
                onClick,
                i * 3 + j,
                highlightCells.indexOf(i * 3 + j) !== -1
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
