import { memo } from "react";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text } from "@/components/text";
import { COLORS } from "@/theme";
import { scaleFromHeight } from "@/utils/responsive";

export const GameTitle = memo(() => {
  const { t } = useTranslation();
  
  const pulseAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            600,
            withRepeat(
              withSequence(
                withTiming(1.08, { duration: 600 }),
                withTiming(1, { duration: 600 })
              ),
              -1,
              true
            )
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, pulseAnimated]}>
      <Text style={styles.title}>{t("title.game")}</Text>
      <Text style={styles.arena}>{t("title.arena")}</Text>
    </Animated.View>
  );
});

GameTitle.displayName = "GameTitle";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    color: COLORS.text,
    fontSize: scaleFromHeight(16),
  },
  arena: {
    color: COLORS.playerX,
    fontSize: scaleFromHeight(36),
    textAlign: "center",
  },
});
