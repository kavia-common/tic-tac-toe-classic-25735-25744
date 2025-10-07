import React from 'react';

/**
 * Scoreboard displays current match scores for X, O, and Draws.
 * Props:
 * - scores: { X: number, O: number, Draws: number }
 */
// PUBLIC_INTERFACE
export default function Scoreboard({ scores }) {
  return (
    <div>
      <div className="scoreboard" role="group" aria-label="Scores">
        <div className="score-card" aria-label="Score X">
          <div className="score-title">Player X</div>
          <div className="score-value" style={{ color: 'var(--color-primary)' }}>{scores.X}</div>
        </div>
        <div className="score-card" aria-label="Score O">
          <div className="score-title">Player O</div>
          <div className="score-value" style={{ color: 'var(--color-secondary)' }}>{scores.O}</div>
        </div>
        <div className="score-card" aria-label="Draws">
          <div className="score-title">Draws</div>
          <div className="score-value" style={{ color: '#6b7280' }}>{scores.Draws}</div>
        </div>
      </div>
    </div>
  );
}
