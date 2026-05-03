import { useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PIConfetti } from "react-native-fast-confetti";
import { scaleFromWidth } from "@/utils/responsive";

import {
  GameScreen,
  useGameScreen,
  type Difficulty,
  type GameMode,
} from "@/features/game";
import { COLORS } from "@/theme";

export default function GameRoute() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const gameMode = (params.mode as GameMode) || "pve";
  const difficulty = (params.difficulty as Difficulty) || "hard";

  const { gameState, confettiRef, showConfetti, confettiColors } =
    useGameScreen({ gameMode, difficulty });

  const handleBackToHome = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <GameScreen
          gameMode={gameMode}
          gameState={gameState}
          difficulty={difficulty}
          onRetry={gameState.reset}
          onBackToHome={handleBackToHome}
        />
      </ScrollView>
      {showConfetti && (
        <View style={StyleSheet.absoluteFill}>
          <PIConfetti
            count={500}
            flakeSize={{ width: 10, height: 10 }}
            blastRadius={300}
            fallDuration={4000}
            blastDuration={600}
            colors={confettiColors}
            fadeOutOnEnd
            ref={confettiRef}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  content: {
    alignItems: "center",
    paddingHorizontal: scaleFromWidth(16),
    paddingVertical: scaleFromWidth(12),
  },
  safeArea: { backgroundColor: COLORS.background, flex: 1 },
});
