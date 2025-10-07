import React, { useEffect, useMemo, useState } from 'react';
import Board from './Board';
import Controls from './Controls';
import Scoreboard from './Scoreboard';
import { bestMoveHeuristic } from '../utils/ai';

/**
 * Game component controls board state, turn flow, winner/draw detection,
 * AI moves, and score tracking.
 */
// PUBLIC_INTERFACE
export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isAIMode, setIsAIMode] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const isFull = useMemo(() => isBoardFull(board), [board]);
  const isDraw = !winnerInfo && isFull;

  // Auto-increment scores when game concludes
  useEffect(() => {
    if (winnerInfo?.winner) {
      setScores(prev => ({ ...prev, [winnerInfo.winner]: prev[winnerInfo.winner] + 1 }));
    } else if (isDraw) {
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerInfo?.winner, isDraw]);

  // AI move handler: AI always plays O when enabled
  useEffect(() => {
    const gameOver = Boolean(winnerInfo) || isDraw;
    if (!isAIMode || gameOver) return;
    if (xIsNext) return; // wait for human X

    const timer = setTimeout(() => {
      const move = bestMoveHeuristic(board, 'O');
      if (move != null) {
        handleMove(move);
      }
    }, 250); // small delay for UX

    return () => clearTimeout(timer);
  }, [board, isAIMode, xIsNext, winnerInfo, isDraw]);

  const handleMove = (index) => {
    if (winnerInfo || board[index] || isDraw) return;

    const next = board.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const toggleAI = () => {
    // When enabling AI, reset game to ensure user is X and AI is O
    setIsAIMode((prev) => {
      const next = !prev;
      if (next) {
        handleReset();
      }
      return next;
    });
  };

  const statusText = winnerInfo
    ? `Winner: ${winnerInfo.winner}`
    : isDraw
    ? 'It’s a draw!'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <main className="content">
      <section className="panel" aria-labelledby="status-heading">
        <div className="status">
          <div className="legend" id="status-heading" aria-live="polite" aria-atomic="true">
            <span className="dot-x" aria-hidden="true"></span>
            <span>Player X</span>
            <span style={{ margin: '0 8px', color: '#9ca3af' }}>vs</span>
            <span className="dot-o" aria-hidden="true"></span>
            <span>{isAIMode ? 'Computer (O)' : 'Player O'}</span>
          </div>
          <span className="status-badge" role="status">{statusText}</span>
        </div>

        <Board
          board={board}
          onPlay={handleMove}
          disabled={Boolean(winnerInfo) || isDraw || (isAIMode && !xIsNext)}
          winLine={winnerInfo?.line ?? []}
        />

        <Controls
          isAIMode={isAIMode}
          onToggleAI={toggleAI}
          onReset={handleReset}
          gameOver={Boolean(winnerInfo) || isDraw}
        />
      </section>

      <aside className="panel" aria-label="Scoreboard">
        <Scoreboard scores={scores} />
        <p className="footer-note">Scores reset on page reload.</p>
      </aside>
    </main>
  );
}

/**
 * Calculates the winner and winning line for a given board.
 * Returns: { winner: 'X'|'O', line: [a,b,c] } | null
 */
// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diags
  ];

  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return null;
}

/**
 * Returns true if no null squares remain.
 */
// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  return squares.every(Boolean);
}
