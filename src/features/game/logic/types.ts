export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameMode = 'pve' | 'pvp';
export type Move = readonly [row: number, col: number];
