import { Platform, StyleSheet } from "react-native";

import { type FC } from "react";

import { PressableScale } from "pressto";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { COLORS } from "../theme";
import { Text } from "./text";
import { scaleFromHeight, scaleFromWidth } from "../utils/responsive";

import type { TextStyle, ViewStyle } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";

type ButtonProps = {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  textStyle?: TextStyle;
  entering?: AnimatedProps<ViewStyle>["entering"];
  exiting?: AnimatedProps<ViewStyle>["exiting"];
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
  entering,
  exiting,
  disabled = false,
}) => {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  return (
    <Animated.View
      style={[
        styles.container,
        isPrimary && styles.primaryContainer,
        isGhost && styles.ghostContainer,
        style,
      ]}
    >
      <PressableScale
        entering={entering || FadeIn.duration(400)}
        exiting={exiting || FadeOut.duration(200)}
        onPress={onPress}
        enabled={!disabled}
        style={[
          styles.button,
          styles[size],
          isPrimary
            ? styles.primary
            : isGhost
              ? styles.ghost
              : styles.secondary,
          disabled && styles.disabled,
        ]}
      >
        <Text
          style={[
            styles.text,
            { fontSize: SIZE_MAP[size] },
            !isPrimary && !isGhost && styles.secondaryText,
            isGhost && styles.ghostText,
            isPrimary && styles.primaryText,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </PressableScale>
    </Animated.View>
  );
};

const SIZE_MAP = {
  small: scaleFromHeight(11),
  medium: scaleFromHeight(12),
  large: scaleFromHeight(13),
} as const;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  container: {
    borderCurve: "continuous",
    borderRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
      },
      android: {
        elevation: 2,
      },
    }),
  },
  disabled: {
    backgroundColor: COLORS.surface + "80",
    opacity: 0.4,
  },
  disabledText: {
    color: COLORS.textTertiary,
  },

  large: {
    minWidth: scaleFromWidth(96),
    paddingHorizontal: scaleFromWidth(20),
    paddingVertical: scaleFromHeight(8),
  },

  medium: {
    minWidth: scaleFromWidth(80),
    paddingHorizontal: scaleFromWidth(16),
    paddingVertical: scaleFromHeight(7),
  },
  primary: {
    backgroundColor: COLORS.playerX,
  },
  primaryContainer: {
    backgroundColor: COLORS.playerX + "08",
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: COLORS.border + "40",
    borderWidth: 1,
  },
  secondaryText: {
    color: COLORS.textSecondary,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  ghostContainer: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        boxShadow: "none",
      },
      android: {
        elevation: 0,
      },
    }),
  },
  ghostText: {
    color: COLORS.textSecondary,
  },
  small: {
    minWidth: scaleFromWidth(64),
    paddingHorizontal: scaleFromWidth(12),
    paddingVertical: scaleFromHeight(5),
  },
  text: {
    color: COLORS.text,
    letterSpacing: 0.2,
  },
  primaryText: {
    color: "#000000",
  },
});
