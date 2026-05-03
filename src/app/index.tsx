import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "@/theme";
import { HomeScreen } from "@/features/home";
import type { Difficulty } from "@/features/game";

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
    <View style={styles.safeArea}>
      <View style={styles.content}>
        <HomeScreen onStartGame={handleStartGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.background, flex: 1 },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
