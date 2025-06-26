import React, { useState, useEffect } from 'react';
import './App.css';

// Gradient X icon SVG
// PUBLIC_INTERFACE
function XIcon({ className = '', large = false }) {
  return (
    <span className={className + ' t3-xicon'} aria-label="X icon">
      <svg width={large ? 56 : 32} height={large ? 56 : 32} viewBox="0 0 48 48">
        <defs>
          <linearGradient id="x_grad" gradientTransform="rotate(58)">
            <stop offset="0%" stopColor="#FEBC66" />
            <stop offset="100%" stopColor="#FE8366" />
          </linearGradient>
        </defs>
        <line x1="10" y1="10" x2="38" y2="38" stroke="url(#x_grad)" strokeWidth="7.6" strokeLinecap="round" />
        <line x1="10" y1="38" x2="38" y2="10" stroke="url(#x_grad)" strokeWidth="7.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Gradient O icon SVG
// PUBLIC_INTERFACE
function OIcon({ className = '', large = false }) {
  return (
    <span className={className + ' t3-oicon'} aria-label="O icon">
      <svg width={large ? 56 : 32} height={large ? 56 : 32} viewBox="0 0 48 48">
        <defs>
          <linearGradient id="o_grad" gradientTransform="rotate(78)">
            <stop offset="0%" stopColor="#29E4FA" />
            <stop offset="100%" stopColor="#3CB5E8" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="15" fill="none" stroke="url(#o_grad)" strokeWidth="7.6" />
      </svg>
    </span>
  );
}

// PUBLIC_INTERFACE
function ArrowLeftIcon({ className = '', size = 24 }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="none"/>
      <path d="M15.5 19l-7-7 7-7" stroke="#FFF" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
function RefreshIcon({ className = '', size = 24 }) {
  // Mirror horizontally for right-side use
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" style={{ transform: "scaleX(-1)" }}>
      <circle cx="12" cy="12" r="12" fill="none"/>
      <path d="M21 6v6h-6" stroke="#FFF" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M20 12a8 8 0 1 1-2.07-4.9" stroke="#FFF" strokeWidth="2.15" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
// The main app, strictly matching design notes
function App() {
  // State: game board, who's next, winner, draw, score, timer (for future extensibility)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [score, setScore] = useState({ x: 0, o: 0 });
  const [timer, setTimer] = useState(0); // in seconds
  const [isTiming, setIsTiming] = useState(true);

  // Determine winner and line
  function calculateWinner(sq) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6],
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (sq[a] && sq[a] === sq[b] && sq[b] === sq[c]) return { player: sq[a], line };
    }
    return null;
  }
  
  // Timer effect
  useEffect(() => {
    if (!winner && !isDraw && isTiming) {
      const id = setInterval(() => setTimer(t => t + 1), 1000);
      return () => clearInterval(id);
    }
  }, [winner, isDraw, isTiming]);

  // Update winner, draw, winLine, and score
  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w.player);
      setWinLine(w.line);
      setIsTiming(false);
      setScore(prev => ({
        ...prev,
        [w.player.toLowerCase()]: prev[w.player.toLowerCase()] + 1,
      }));
    } else if (squares.every(x => x !== null)) {
      setIsDraw(true);
      setIsTiming(false);
    } else {
      setIsDraw(false);
      setWinner(null);
      setWinLine(null);
    }
  // eslint-disable-next-line
  }, [squares]);

  const formatTimer = t =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`;

  // Square click handler
  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (squares[idx] || winner) return;
    const next = squares.slice();
    next[idx] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  // Restart (resets only the board, not overall score)
  // PUBLIC_INTERFACE
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinLine(null);
    setIsDraw(false);
    setTimer(0);
    setIsTiming(true);
  }

  // PUBLIC_INTERFACE
  function Square({ idx, value, onClick, isWin, isActive, isLastRow, isLastCol }) {
    let marker = null;
    if (value === 'X') marker = <span className="t3-xicon-cell"><XIcon large /></span>;
    if (value === 'O') marker = <span className="t3-oicon-cell"><OIcon large /></span>;
    let cellClasses = 't3-cell';
    if (isActive) cellClasses += ' t3-active';
    if (isWin) cellClasses += ' t3-win';
    if (isLastRow) cellClasses += ' t3-cell-lastrow';
    if (isLastCol) cellClasses += ' t3-cell-lastcol';
    return (
      <button
        className={cellClasses}
        aria-label={value ? `Cell with ${value}` : "Empty cell"}
        tabIndex={0}
        onClick={onClick}
      >
        {marker}
      </button>
    );
  }

  // Build the 3x3 board using CSS grid to match spacing and grid lines.
  function renderBoard() {
    return (
      <div className="t3-board" role="grid">
        {Array(9).fill(0).map((_, idx) => {
          const row = Math.floor(idx / 3);
          const col = idx % 3;
          const isWin = winLine ? winLine.includes(idx) : false;
          const isActive = !winner && squares[idx] == null;
          return (
            <Square
              key={idx}
              idx={idx}
              value={squares[idx]}
              onClick={() => handleClick(idx)}
              isWin={isWin}
              isActive={isActive}
              isLastRow={row === 2}
              isLastCol={col === 2}
            />
          );
        })}
      </div>
    );
  }

  // HeaderBar
  function HeaderBar() {
    return (
      <header className="t3-headerbar">
        <button className="t3-header-btn" aria-label="Back">
          <ArrowLeftIcon size={24} />
        </button>
        <span className="t3-header-center-pill">LEVEL:- 0/10</span>
        <button className="t3-header-btn" aria-label="Restart" onClick={resetGame}>
          <RefreshIcon size={24} />
        </button>
      </header>
    );
  }

  // Score and player indicator row
  function StatusRow() {
    return (
      <div className="t3-score-row">
        <span className="t3-xicon"><XIcon /></span>
        <span className="t3-score-mid">
          <span style={{ color: 'var(--score-red)' }}>{score.x}</span>
          <span className="t3-score-dash">-</span>
          <span style={{ color: 'var(--score-red)' }}>{score.o}</span>
        </span>
        <span className="t3-oicon"><OIcon /></span>
      </div>
    );
  }

  function TimerRow() {
    return (
      <div className="t3-timer-row">
        <span className="t3-timer-val">{formatTimer(timer)}</span>
      </div>
    );
  }

  let resultBanner = "";
  if (winner) resultBanner = `${winner} Win`;
  else if (isDraw) resultBanner = "DRAW";

  return (
    <div className="ttt-root">
      <HeaderBar />
      <StatusRow />
      <TimerRow />
      <main className="t3-board-wrap">
        {renderBoard()}
      </main>
      <div className="t3-result-banner">
        {resultBanner}
      </div>
    </div>
  );
}

export default App;
