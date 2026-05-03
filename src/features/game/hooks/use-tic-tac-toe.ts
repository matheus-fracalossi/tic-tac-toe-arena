import { useCallback, useEffect, useMemo, useState } from 'react';
import { checkWinner, createEmptyBoard, getBestMove, type Board as TTTBoard, type Difficulty, type Winner, type WinningLine } from '../logic';

type GameMode = 'pve' | 'pvp';

export type UseTicTacToeOptions = {
  gameMode: GameMode;
  difficulty?: Difficulty;
  onMove?: () => void;
};

export type TicTacToeGameState = {
  board: TTTBoard;
  currentTurn: 'X' | 'O';
  winner: Winner;
  winningLine: WinningLine;
  lastMove: { row: number; col: number } | null;
  isMachineThinking: boolean;
  makeMove: (row: number, col: number) => void;
  reset: () => void;
  resetCount: number;
};

export function useTicTacToe({ gameMode, difficulty = 'hard', onMove }: UseTicTacToeOptions) {
  const [board, setBoard] = useState<TTTBoard>(createEmptyBoard());
  const [currentTurn, setCurrentTurn] = useState<'X' | 'O'>('X');
  const [lastMove, setLastMove] = useState<{ row: number; col: number } | null>(null);
  const [isMachineThinking, setIsMachineThinking] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  const { winner, winningLine } = useMemo(() => checkWinner(board), [board]);

  const reset = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentTurn('X');
    setLastMove(null);
    setIsMachineThinking(false);
    setResetCount(prev => prev + 1);
  }, []);

  const makeMove = useCallback((row: number, col: number) => {
    if (winner || isMachineThinking || board[row][col] || (gameMode === 'pve' && currentTurn === 'O')) {
      return;
    }

    onMove?.();

    const newBoard = board.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? currentTurn : c))
    );

    setBoard(newBoard);
    setLastMove({ row, col });

    // Set machine thinking before changing turn to prevent UI flicker
    if (gameMode === 'pve' && currentTurn === 'X') {
      setIsMachineThinking(true);
    }

    setCurrentTurn(prev => (prev === 'X' ? 'O' : 'X'));
  }, [board, currentTurn, winner, isMachineThinking, gameMode, onMove]);

  useEffect(() => {
    if (gameMode === 'pve' && currentTurn === 'O' && !winner) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board, difficulty);
        if (bestMove) {
          const [r, c] = bestMove;
          const newBoard = board.map((row, rIdx) =>
            row.map((col, cIdx) => (rIdx === r && cIdx === c ? 'O' : col))
          );
          setBoard(newBoard);
          setLastMove({ row: r, col: c });
          setCurrentTurn('X');
        }
        setIsMachineThinking(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentTurn, winner, board, gameMode, difficulty]);

  return {
    board,
    currentTurn,
    winner,
    winningLine,
    lastMove,
    isMachineThinking,
    makeMove,
    reset,
    resetCount,
  };
}
