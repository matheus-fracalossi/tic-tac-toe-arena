import {
  applyMove,
  createEmptyBoard,
  getAvailableMoves,
  isBoardFull,
} from '../board';

describe('createEmptyBoard', () => {
  it('returns a 3x3 grid of nulls', () => {
    const board = createEmptyBoard();
    expect(board).toHaveLength(3);
    board.forEach((row) => {
      expect(row).toHaveLength(3);
      row.forEach((cell) => expect(cell).toBeNull());
    });
  });

  it('returns independent instances on each call', () => {
    const a = createEmptyBoard();
    const b = createEmptyBoard();
    a[0][0] = 'X';
    expect(b[0][0]).toBeNull();
  });
});

describe('isBoardFull', () => {
  it('returns false for an empty board', () => {
    expect(isBoardFull(createEmptyBoard())).toBe(false);
  });

  it('returns false when at least one cell is null', () => {
    const board = createEmptyBoard();
    board[0] = ['X', 'O', 'X'];
    board[1] = ['X', 'O', 'X'];
    board[2] = ['O', 'X', null];
    expect(isBoardFull(board)).toBe(false);
  });

  it('returns true when every cell is filled', () => {
    const board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ] as const;
    expect(isBoardFull(board.map((r) => [...r]))).toBe(true);
  });
});

describe('getAvailableMoves', () => {
  it('returns all 9 positions on an empty board', () => {
    expect(getAvailableMoves(createEmptyBoard())).toHaveLength(9);
  });

  it('omits filled positions', () => {
    const board = createEmptyBoard();
    board[0][0] = 'X';
    board[1][1] = 'O';
    const moves = getAvailableMoves(board);
    expect(moves).toHaveLength(7);
    expect(moves).not.toContainEqual([0, 0]);
    expect(moves).not.toContainEqual([1, 1]);
  });

  it('returns empty array when board is full', () => {
    const board = [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ] as const;
    expect(getAvailableMoves(board.map((r) => [...r]))).toEqual([]);
  });
});

describe('applyMove', () => {
  it('places the player at the given coordinates', () => {
    const board = createEmptyBoard();
    const next = applyMove(board, 1, 2, 'X');
    expect(next[1][2]).toBe('X');
  });

  it('does not mutate the source board', () => {
    const board = createEmptyBoard();
    applyMove(board, 0, 0, 'O');
    expect(board[0][0]).toBeNull();
  });
});
