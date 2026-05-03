import type { Board } from './board';
import type { Player } from './types';

export type Winner = Player | 'draw' | null;
export type WinningLine = [number, number][] | null;

const WINNING_LINES: [number, number][][] = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

export const checkWinner = (
  board: Board,
): { winner: Winner; winningLine: WinningLine } => {
  for (const line of WINNING_LINES) {
    const [[aRow, aCol], [bRow, bCol], [cRow, cCol]] = line;
    const cell = board[aRow][aCol];
    if (cell && cell === board[bRow][bCol] && cell === board[cRow][cCol]) {
      return { winner: cell, winningLine: line };
    }
  }

  const isDraw = board.every((row) => row.every((cell) => cell !== null));
  if (isDraw) {
    return { winner: 'draw', winningLine: null };
  }

  return { winner: null, winningLine: null };
};
