import { memo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/button";
import { scaleFromHeight } from "@/utils/responsive";

type GameActionsProps = {
  onRetry: () => void;
  onBackToHome: () => void;
  showRetry: boolean;
};

export const GameActions = memo<GameActionsProps>(
  ({ onRetry, onBackToHome, showRetry }) => {
    const { t } = useTranslation();

    return (
      <View style={styles.gameActions}>
        {showRetry && (
          <Animated.View
            entering={FadeIn.duration(400)}
            style={styles.retryContainer}
          >
            <Button
              title={t("actions.retry")}
              variant="primary"
              size="medium"
              onPress={onRetry}
            />
          </Animated.View>
        )}

        <Button
          title={t("actions.backToHome")}
          variant="ghost"
          size="small"
          onPress={onBackToHome}
          style={styles.backButton}
        />
      </View>
    );
  },
);

GameActions.displayName = "GameActions";

const styles = StyleSheet.create({
  gameActions: {
    alignItems: "center",
    marginTop: scaleFromHeight(12),
    width: "100%",
  },
  retryContainer: {
    marginTop: scaleFromHeight(18),
  },
  backButton: {
    marginTop: scaleFromHeight(22),
  },
});
