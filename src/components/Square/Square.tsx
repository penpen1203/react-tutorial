import React from "react";

import { Option, toNullable } from "../../util/Option";
import { pipe } from "../../util/pipe";

export interface SquareProps {
  value: Option<string>;
  onClick: () => void;
  isHighlight: boolean;
}

export const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  isHighlight,
}) => {
  return (
    <button
      className={`square ${isHighlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {pipe(value, toNullable)}
    </button>
  );
};
