import type { Board } from '../board';
import { checkWinner } from '../winner';

const board = (rows: string[]): Board =>
  rows.map((row) => row.split('').map((c) => (c === '.' ? null : (c as 'X' | 'O'))));

describe('checkWinner', () => {
  it('returns null winner on an empty board', () => {
    expect(checkWinner(board(['...', '...', '...']))).toEqual({
      winner: null,
      winningLine: null,
    });
  });

  it('detects a row win', () => {
    const result = checkWinner(board(['XXX', 'O.O', '...']));
    expect(result.winner).toBe('X');
    expect(result.winningLine).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it('detects a column win', () => {
    const result = checkWinner(board(['O.X', 'O.X', 'O..']));
    expect(result.winner).toBe('O');
    expect(result.winningLine).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it('detects a diagonal win (top-left to bottom-right)', () => {
    const result = checkWinner(board(['X..', '.X.', '..X']));
    expect(result.winner).toBe('X');
    expect(result.winningLine).toEqual([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
  });

  it('detects a diagonal win (top-right to bottom-left)', () => {
    const result = checkWinner(board(['..O', '.O.', 'O..']));
    expect(result.winner).toBe('O');
    expect(result.winningLine).toEqual([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
  });

  it('returns "draw" when board is full and no winner', () => {
    expect(checkWinner(board(['XOX', 'XOO', 'OXX']))).toEqual({
      winner: 'draw',
      winningLine: null,
    });
  });

  it('returns null when the game is still ongoing', () => {
    expect(checkWinner(board(['XO.', '.X.', 'O..']))).toEqual({
      winner: null,
      winningLine: null,
    });
  });
});
