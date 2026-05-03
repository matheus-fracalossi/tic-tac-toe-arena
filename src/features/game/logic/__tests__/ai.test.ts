import { applyMove, createEmptyBoard } from '../board';
import { getBestMove } from '../ai';
import { checkWinner } from '../winner';
import type { Board } from '../board';

const board = (rows: string[]): Board =>
  rows.map((row) => row.split('').map((c) => (c === '.' ? null : (c as 'X' | 'O'))));

describe('getBestMove on hard difficulty', () => {
  it('blocks an immediate winning threat', () => {
    const state = board(['XX.', '...', '...']);
    const move = getBestMove(state, 'hard');
    expect(move).toEqual([0, 2]);
  });

  it('takes a winning move when available', () => {
    const state = board(['OO.', 'XX.', '...']);
    const move = getBestMove(state, 'hard');
    expect(move).toEqual([0, 2]);
  });

  it('returns null when board is full', () => {
    const state = board(['XOX', 'XOO', 'OXX']);
    expect(getBestMove(state, 'hard')).toBeNull();
  });

  it('never loses to optimal X play (cannot lose from empty board)', () => {
    let state = createEmptyBoard();
    let turn: 'X' | 'O' = 'X';
    while (!checkWinner(state).winner) {
      if (turn === 'X') {
        const move = getBestMove(state, 'hard');
        if (!move) break;
        state = applyMove(state, move[0], move[1], 'X');
      } else {
        const move = getBestMove(state, 'hard');
        if (!move) break;
        state = applyMove(state, move[0], move[1], 'O');
      }
      turn = turn === 'X' ? 'O' : 'X';
    }
    expect(['draw', 'O', null]).toContain(checkWinner(state).winner);
  });
});

describe('getBestMove on easy difficulty', () => {
  it('returns a valid available move', () => {
    const state = board(['X..', '.O.', '...']);
    const move = getBestMove(state, 'easy');
    expect(move).not.toBeNull();
    const [r, c] = move!;
    expect(state[r][c]).toBeNull();
  });
});
