import React from "react";

export interface SquareProps {
  value: String | null;
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
      {value}
    </button>
  );
};
