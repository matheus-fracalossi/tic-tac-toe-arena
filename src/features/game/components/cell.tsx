/**
 * Individual cell component that renders a single Tic-Tac-Toe cell
 * with animations for highlighting and X/O placement
 */

import { Platform, Pressable, StyleSheet, Text as RNText } from "react-native";
import { memo, useMemo } from "react";
import Animated, {
  ZoomIn,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

import { CELL_SIZE } from "./constants";
import { scaleFromWidth } from "@/utils/responsive";
import { COLORS } from "@/theme";
import type { CellValue } from "../logic";

export type { CellValue };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(RNText);

export type CellProps = {
  value: CellValue;
  onPress: () => void;
  disabled: boolean;
  isWinning?: boolean;
  isLast?: boolean;
  currentTurn: "X" | "O";
};

const CellComponent = ({
  value,
  onPress,
  disabled,
  isWinning,
  isLast,
  currentTurn,
}: CellProps) => {
  const isPressed = useSharedValue(false);

  const colors = useMemo(
    () => ({
      piece: value === "X" ? COLORS.playerX : COLORS.playerO,
      press:
        currentTurn === "X"
          ? COLORS.playerXTransparent
          : COLORS.playerOTransparent,
      highlight:
        value === "X" ? COLORS.playerXTransparent : COLORS.playerOTransparent,
    }),
    [value, currentTurn],
  );

  const pressStyle = useAnimatedStyle(() => {
    let bgColor: string = COLORS.surface;
    if (isWinning) bgColor = colors.highlight;
    else if (isPressed.value) bgColor = colors.press;
    else if (isLast) bgColor = colors.highlight || "rgba(255,255,255,0.05)";

    return { backgroundColor: withSpring(bgColor) };
  }, [isWinning, isLast, colors]);

  const glowStyle = useMemo(() => {
    if (!value) return {};
    const baseStyle = {
      color: colors.piece,
    };
    return isWinning
      ? {
          ...baseStyle,
          transform: [{ scale: 1.1 }],
        }
      : baseStyle;
  }, [value, colors.piece, isWinning]);

  return (
    <AnimatedPressable
      style={[styles.cell, pressStyle]}
      onPress={onPress}
      onPressIn={() => { isPressed.value = true; }}
      onPressOut={() => { isPressed.value = false; }}
      disabled={disabled}
    >
      {value && (
        <Animated.View entering={ZoomIn.duration(400)}>
          <AnimatedText
            style={[styles.cellText, { color: colors.piece }, glowStyle]}
          >
            {value}
          </AnimatedText>
        </Animated.View>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    borderColor: COLORS.border,
    borderWidth: 0.5,
    height: CELL_SIZE,
    justifyContent: "center",
    width: CELL_SIZE,
  },
  cellText: {
    fontSize: Math.min(CELL_SIZE * 0.55, scaleFromWidth(48)),
    fontFamily: Platform.select({
      android: "PressStart2P_400Regular",
      ios: "Press Start 2P",
    }),
    letterSpacing: Platform.OS === "android" ? 0 : -8,
    paddingTop: 5,
    paddingLeft: Platform.OS === "android" ? 5 : 0,
    includeFontPadding: false,
  },
});

export const Cell = memo(CellComponent);
