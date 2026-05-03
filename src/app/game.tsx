import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PIConfetti } from "react-native-fast-confetti";

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
    <View style={styles.safeArea}>
      <View style={styles.content}>
        <GameScreen
          gameMode={gameMode}
          gameState={gameState}
          difficulty={difficulty}
          onRetry={gameState.reset}
          onBackToHome={handleBackToHome}
        />
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  safeArea: { backgroundColor: COLORS.background, flex: 1 },
});
