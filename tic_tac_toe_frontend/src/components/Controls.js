import React from 'react';

/**
 * Controls provides Reset and AI toggle buttons.
 * Props:
 * - isAIMode: boolean
 * - onToggleAI: () => void
 * - onReset: () => void
 * - gameOver: boolean
 */
// PUBLIC_INTERFACE
export default function Controls({ isAIMode, onToggleAI, onReset, gameOver }) {
  return (
    <div className="controls" role="group" aria-label="Game controls">
      <button
        className="btn btn-primary"
        onClick={onReset}
        aria-label="Reset the current game"
      >
        Reset Game
      </button>

      <button
        className="btn btn-outline"
        onClick={onToggleAI}
        aria-pressed={isAIMode}
        aria-label="Toggle AI opponent"
        title="When enabled: You are X, Computer is O"
      >
        {isAIMode ? 'Disable AI' : 'Enable AI'}
      </button>

      <span
        className="btn"
        style={{ cursor: 'default' }}
        aria-hidden="true"
        title="Game state indicator"
      >
        {gameOver ? 'Game Over' : 'In Progress'}
      </span>
    </div>
  );
}
