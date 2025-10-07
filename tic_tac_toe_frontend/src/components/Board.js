import React from 'react';
import Square from './Square';

/**
 * Board renders a 3x3 grid of Square components.
 * Props:
 * - board: array of 9 values ('X'|'O'|null)
 * - onPlay: function(index)
 * - disabled: boolean
 * - winLine: array of indices to highlight
 */
// PUBLIC_INTERFACE
export default function Board({ board, onPlay, disabled, winLine = [] }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {board.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onPlay(idx)}
          disabled={disabled || Boolean(value)}
          highlight={winLine.includes(idx)}
          index={idx}
        />
      ))}
    </div>
  );
}
