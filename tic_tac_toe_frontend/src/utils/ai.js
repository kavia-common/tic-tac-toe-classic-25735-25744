import { lines } from './linesData';

/**
 * Heuristic AI: try to win, block, else center, corners, sides.
 * Returns index (0..8) or null if no move.
 */
// PUBLIC_INTERFACE
export function bestMoveHeuristic(board, aiPlayer = 'O') {
  const human = aiPlayer === 'X' ? 'O' : 'X';

  // 1) Win if possible
  const winIdx = findFinishingMove(board, aiPlayer);
  if (winIdx != null) return winIdx;

  // 2) Block opponent
  const blockIdx = findFinishingMove(board, human);
  if (blockIdx != null) return blockIdx;

  // 3) Center
  if (!board[4]) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8].filter(i => !board[i]);
  if (corners.length) return corners[0];

  // 5) Sides
  const sides = [1, 3, 5, 7].filter(i => !board[i]);
  if (sides.length) return sides[0];

  return null;
}

function findFinishingMove(board, player) {
  for (const [a, b, c] of lines) {
    const trio = [board[a], board[b], board[c]];
    const countPlayer = trio.filter(v => v === player).length;
    const countEmpty = trio.filter(v => v == null).length;
    if (countPlayer === 2 && countEmpty === 1) {
      if (!board[a]) return a;
      if (!board[b]) return b;
      if (!board[c]) return c;
    }
  }
  return null;
}
