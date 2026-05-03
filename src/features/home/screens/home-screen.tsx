import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, {
  FadeIn,
  FadeOut,
  FadeInUp,
  LightSpeedInRight,
} from "react-native-reanimated";

import { Button } from "@/components/button";
import { Slider } from "@/components/slider";
import { AudioToggleButton } from "@/features/audio";
import type { Difficulty } from "@/features/game";

import { GameTitle } from "../components/game-title";
import { useHomeScreen } from "../hooks/use-home-screen";

type HomeScreenProps = {
  onStartGame: (mode: "pve" | "pvp", difficulty?: Difficulty) => void;
};

export const HomeScreen = memo<HomeScreenProps>(({ onStartGame }) => {
  const { t } = useTranslation();
  const {
    difficulty,
    setDifficulty,
    difficultyOptions,
    language,
    changeLanguage,
    languageOptions,
  } = useHomeScreen();

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      exiting={FadeOut.duration(300)}
      style={styles.homeContainer}
    >
      <Animated.View entering={LightSpeedInRight}>
        <GameTitle />
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(500)}
        style={styles.optionsContainer}
      >
        <Slider
          options={difficultyOptions}
          value={difficulty}
          onChange={setDifficulty}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={t("actions.playerVsAi")}
            onPress={() => onStartGame("pve", difficulty)}
            size="large"
            variant="primary"
            style={styles.modeButton}
          />
          <Button
            title={t("actions.localPvp")}
            onPress={() => onStartGame("pvp")}
            size="large"
            variant="secondary"
            style={styles.modeButton}
          />
        </View>
        <Slider
          options={languageOptions}
          value={language}
          onChange={changeLanguage}
        />
        <AudioToggleButton />
      </Animated.View>
    </Animated.View>
  );
});

HomeScreen.displayName = "HomeScreen";

const styles = StyleSheet.create({
  homeContainer: {
    alignItems: "center",
    gap: 60,
  },
  optionsContainer: {
    gap: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    gap: 16,
  },
  modeButton: {
    alignSelf: "center",
  },
  languageSlider: {},
  difficultySlider: {},
  audioButton: {},
});
