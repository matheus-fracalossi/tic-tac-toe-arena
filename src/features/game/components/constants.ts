import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Cap by both width (with side padding) and a fraction of the height so the
// board never crowds the avatars / actions on small devices like the iPhone SE.
export const BOARD_SIZE = Math.min(width - 32, height * 0.42, 360);
export const CELL_SIZE = BOARD_SIZE / 3;
