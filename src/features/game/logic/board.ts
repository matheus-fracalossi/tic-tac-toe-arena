import type { CellValue, Move, Player } from './types';

export type Board = CellValue[][];

export const createEmptyBoard = (): Board =>
  Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

export const isBoardFull = (board: Board): boolean =>
  board.every((row) => row.every((cell) => cell !== null));

export const getAvailableMoves = (board: Board): Move[] => {
  const moves: Move[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        moves.push([row, col]);
      }
    }
  }
  return moves;
};

export const applyMove = (
  board: Board,
  row: number,
  col: number,
  player: Player,
): Board =>
  board.map((r, rIdx) =>
    r.map((c, cIdx) => (rIdx === row && cIdx === col ? player : c)),
  );
