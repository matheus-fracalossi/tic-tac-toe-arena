/**
 * Board component that renders the 3x3 Tic-Tac-Toe grid
 */

import { memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Cell } from "./cell";
import { BOARD_SIZE } from "./constants";
import { COLORS } from "@/theme";
import type { CellValue } from "../logic";

export type BoardProps = {
  board: CellValue[][];
  winningLine: [number, number][] | null;
  lastMove: { row: number; col: number } | null;
  currentTurn: "X" | "O";
  isMachineThinking: boolean;
  winner: string | null;
  makeMove: (r: number, c: number) => void;
  resetCount?: number;
};

const BoardComponent = ({
  board,
  winningLine,
  lastMove,
  currentTurn,
  isMachineThinking,
  winner,
  makeMove,
  resetCount,
}: BoardProps) => {
  return (
    <View style={styles.board}>
      {board.map((row, rIdx) => (
        <View key={`row-${rIdx}`} style={styles.row}>
          {row.map((value, cIdx) => (
            <AnimatedCellWrapper
              key={`${rIdx}-${cIdx}-${resetCount}`}
              r={rIdx}
              c={cIdx}
              value={value}
              isWinning={winningLine?.some(
                ([row, col]) => row === rIdx && col === cIdx,
              )}
              isLast={lastMove?.row === rIdx && lastMove?.col === cIdx}
              currentTurn={currentTurn}
              disabled={!!winner || isMachineThinking || !!value}
              onPress={() => makeMove(rIdx, cIdx)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
export const Board = memo(BoardComponent);

type AnimatedCellWrapperProps = {
  r: number;
  c: number;
  value: CellValue;
  isWinning?: boolean;
  isLast?: boolean;
  currentTurn: "X" | "O";
  disabled: boolean;
  onPress: () => void;
};

const AnimatedCellWrapperComponent = ({
  r,
  c,
  value,
  isWinning,
  isLast,
  currentTurn,
  disabled,
  onPress,
}: AnimatedCellWrapperProps) => {
  return (
    <View style={styles.beforeAnimation}>
      <Animated.View
        entering={FadeIn.delay((r + c) * 100).duration(400)}
        style={styles.cellWrapper}
      >
        <Cell
          value={value}
          isWinning={isWinning}
          isLast={isLast}
          currentTurn={currentTurn}
          disabled={disabled}
          onPress={onPress}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  cellWrapper: { flex: 1 },
  row: { flexDirection: "row", flex: 1 },
  beforeAnimation: {
    backgroundColor: COLORS.playerXHighlight,
  },
});

const AnimatedCellWrapper = memo(AnimatedCellWrapperComponent);
