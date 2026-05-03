import { StyleSheet, Text as RNText, Platform } from "react-native";

import type { FC } from "react";

type TextProps = {
  children: React.ReactNode;
  style?: any;
};

export const Text: FC<TextProps> = ({ children, style }) => {
  const flattenedStyle = StyleSheet.flatten([
    {
      fontFamily: Platform.select({
        android: "PressStart2P_400Regular",
        ios: "Press Start 2P",
      }),
      letterSpacing: 0,
      marginBottom: Platform.select({
        android: -6,
        ios: 0,
      }),
    },
    style,
  ]);
  return <RNText style={flattenedStyle}>{children}</RNText>;
};
