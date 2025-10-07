import React from 'react';

/**
 * Square represents a single playable cell.
 * Props:
 * - value: 'X' | 'O' | null
 * - onClick: () => void
 * - disabled: boolean
 * - highlight: boolean (if part of winning line)
 * - index: number (for aria-label)
 */
// PUBLIC_INTERFACE
export default function Square({ value, onClick, disabled, highlight, index }) {
  const pieceClass = value === 'X' ? 'piece-x' : value === 'O' ? 'piece-o' : '';
  return (
    <button
      type="button"
      className={`square ${pieceClass} ${highlight ? 'win' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Square ${index + 1}${value ? ` contains ${value}` : ''}`}
    >
      {value}
    </button>
  );
}
