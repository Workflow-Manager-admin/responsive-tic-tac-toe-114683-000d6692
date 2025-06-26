import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Game state: squares is an array of 9, 'X' or 'O' or null
  const [squares, setSquares] = useState(Array(9).fill(null));
  // true -> X's turn, false -> O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Track winner state for end game message
  const [winner, setWinner] = useState(null);
  // Track if all squares full (draw)
  const [isDraw, setIsDraw] = useState(false);

  // Determine winner using classic lines logic
  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6],         // diags
    ];
    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[b] === sq[c])
        return sq[a];
    }
    return null;
  }
  
  // Check for game end state every board update
  useEffect(() => {
    const w = calculateWinner(squares);
    setWinner(w);
    if (!w && squares.every(x => x !== null)) setIsDraw(true);
    else setIsDraw(false);
  }, [squares]);

  // Handle click on each square, ignore if already played or game over
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (squares[idx] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  }

  // Generate status label
  let status;
  if (winner)
    status = `Winner: ${winner}`;
  else if (isDraw)
    status = "It's a draw!";
  else
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;

  // PUBLIC_INTERFACE
  function Square({ value, onClick }) {
    return (
      <button
        className={`ttt-square${value ? " filled" : ""}`}
        onClick={onClick}
        aria-label={value ? `Square with ${value}` : `Empty square`}
        tabIndex={0}
      >
        {value}
      </button>
    );
  }

  // Construct grid as three rows for layout clarity
  function renderBoard() {
    const boardRows = [];
    for (let row = 0; row < 3; ++row) {
      const squaresRow = [];
      for (let col = 0; col < 3; ++col) {
        const idx = row * 3 + col;
        squaresRow.push(
          <Square
            key={idx}
            value={squares[idx]}
            onClick={() => handleClick(idx)}
          />
        );
      }
      boardRows.push(
        <div className="ttt-board-row" key={row}>
          {squaresRow}
        </div>
      );
    }
    return <div className="ttt-board">{boardRows}</div>;
  }
  
  return (
    <div className="ttt-root">
      <div className="ttt-card">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-info-row">
          <div className={`ttt-player ttt-player-x${xIsNext && !winner && !isDraw ? " active" : ""}`}>
            X
          </div>
          <div className={`ttt-player ttt-player-o${!xIsNext && !winner && !isDraw ? " active" : ""}`}>
            O
          </div>
        </div>
        {renderBoard()}
        <div className="ttt-status">{status}</div>
        <button className="ttt-restart-btn" onClick={resetGame}>
          Restart
        </button>
      </div>
      <footer className="ttt-footer">
        <span className="ttt-footer-text">✦ Local two-player | Responsive | Modern UI</span>
      </footer>
    </div>
  );
}

export default App;
