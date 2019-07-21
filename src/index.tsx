import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

type SquareType = ("O" | "X" | null)[];

interface SquareProps {
  value: String | null;
  onClick: () => void;
  isHighlight: boolean;
}

function Square(props: SquareProps) {
  return (
    <button
      className={`square ${props.isHighlight ? "highlight" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: SquareType;
  onClick: (i: number) => void;
  highlightCells: number[];
}

class Board extends React.Component<BoardProps, {}> {
  renderSquare(i: number, isHighlight: boolean = false) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isHighlight={isHighlight}
      />
    );
  }

  render() {
    return (
      <div>
        {Array(3)
          .fill(0)
          .map((row, i: number) => {
            return (
              <div className="board-row" key={i}>
                {Array(3)
                  .fill(0)
                  .map((col, j: number) => {
                    return this.renderSquare(
                      i * 3 + j,
                      this.props.highlightCells.indexOf(i * 3 + j) !== -1
                    );
                  })}
              </div>
            );
          })}
      </div>
    );
  }
}

interface HistoryData {
  squares: ("O" | "X" | null)[];
  col: number;
  row: number;
}

interface GameState {
  history: HistoryData[];
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends React.Component<{}, GameState> {
  constructor(props: BoardProps) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          col: 0,
          row: 0
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          col: (i % 3) + 1,
          row: Math.floor(i / 3) + 1
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + "(" + step.col + "," + step.row + ")"
        : "Go to game start";
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={this.state.stepNumber === move ? "bold" : ""}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (result) {
      status = "Winner: " + result.winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            highlightCells={result ? result.line : []}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares: ("O" | "X" | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}
