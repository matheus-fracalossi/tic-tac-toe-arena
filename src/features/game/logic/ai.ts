import { applyMove, type Board } from './board';
import type { Move } from './types';
import { checkWinner } from './winner';

export type Difficulty = 'easy' | 'hard';

const OPTIMAL_MOVE_PROBABILITY: Record<Difficulty, number> = {
  easy: 0,
  hard: 1,
};

const evaluatePosition = (
  board: Board,
  depth: number,
  isAiTurn: boolean,
  alpha: number,
  beta: number,
): number => {
  const { winner } = checkWinner(board);

  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'draw') return 0;

  if (isAiTurn) {
    let bestScore = -Infinity;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const nextBoard = applyMove(board, row, col, 'O');
          const score = evaluatePosition(nextBoard, depth + 1, false, alpha, beta);

          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score);

          if (beta <= alpha) break;
        }
      }
      if (beta <= alpha) break;
    }

    return bestScore;
  }

  let bestScore = Infinity;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        const nextBoard = applyMove(board, row, col, 'X');
        const score = evaluatePosition(nextBoard, depth + 1, true, alpha, beta);

        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);

        if (beta <= alpha) break;
      }
    }
    if (beta <= alpha) break;
  }

  return bestScore;
};

const getRandomMove = (board: Board): Move | null => {
  const moves: Move[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) moves.push([row, col]);
    }
  }
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
};

const getOptimalMove = (board: Board): Move | null => {
  let bestScore = -Infinity;
  let bestMove: Move | null = null;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        const nextBoard = applyMove(board, row, col, 'O');
        const moveScore = evaluatePosition(nextBoard, 0, false, -Infinity, Infinity);

        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = [row, col];
        }
      }
    }
  }

  return bestMove;
};

export const getBestMove = (
  board: Board,
  difficulty: Difficulty = 'hard',
): Move | null => {
  const shouldPlayOptimally =
    Math.random() < OPTIMAL_MOVE_PROBABILITY[difficulty];
  return shouldPlayOptimally ? getOptimalMove(board) : getRandomMove(board);
};
