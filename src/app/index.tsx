import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { COLORS } from "@/theme";
import { HomeScreen } from "@/features/home";
import type { Difficulty } from "@/features/game";
import { scaleFromWidth } from "@/utils/responsive";

export default function HomeRoute() {
  const router = useRouter();

  const handleStartGame = useCallback(
    (mode: "pve" | "pvp", difficulty?: Difficulty) => {
      router.push({
        pathname: "/game",
        params: { mode, ...(difficulty ? { difficulty } : {}) },
      });
    },
    [router],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom", "left", "right"]}>
      <View style={styles.content}>
        <HomeScreen onStartGame={handleStartGame} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.background, flex: 1 },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: scaleFromWidth(16),
    paddingVertical: scaleFromWidth(12),
  },
});
