import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Avatar } from "./avatar";
import { Text } from "@/components/text";
import { ColorIndicator } from "./color-indicator";
import { COLORS } from "@/theme";
import { scaleFromHeight, scaleFromWidth, SCREEN_WIDTH } from "@/utils/responsive";

// Scale the avatar so all three columns (avatar | VS | avatar) fit within
// the screen width, even on the iPhone SE (320pt).
const AVATAR_SIZE = Math.min(scaleFromWidth(72), Math.floor((SCREEN_WIDTH - 96) / 2));

type PlayerHeaderInfo = {
  image: any;
  glowColor: string;
  label: string;
  isActive: boolean;
};

type GameHeaderProps = {
  player1: PlayerHeaderInfo;
  player2: PlayerHeaderInfo;
};

export const GameHeader = memo<GameHeaderProps>(({ player1, player2 }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <View style={styles.avatarGroup}>
          <Avatar
            image={player1.image}
            glowColor={player1.glowColor}
            isActive={player1.isActive}
            size={AVATAR_SIZE}
          />
          <View style={styles.labelWrapper}>
            <ColorIndicator
              color={player1.glowColor}
              isActive={player1.isActive}
            />
            <Text style={styles.avatarLabel}>{player1.label}</Text>
          </View>
        </View>

        <Text style={styles.vsText}>{t("title.vs")}</Text>

        <View style={styles.avatarGroup}>
          <Avatar
            image={player2.image}
            glowColor={player2.glowColor}
            isActive={player2.isActive}
            size={AVATAR_SIZE}
            flipHorizontal
          />
          <View style={styles.labelWrapper}>
            <ColorIndicator
              color={player2.glowColor}
              isActive={player2.isActive}
            />
            <Text style={styles.avatarLabel}>{player2.label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

GameHeader.displayName = "GameHeader";

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: scaleFromHeight(28),
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: scaleFromWidth(16),
    marginBottom: scaleFromHeight(12),
  },
  avatarGroup: {
    alignItems: "center",
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleFromHeight(8),
    gap: scaleFromWidth(6),
  },
  avatarLabel: {
    color: COLORS.text,
    fontSize: scaleFromHeight(11),
    letterSpacing: 0.5,
  },
  vsText: {
    color: COLORS.textSecondary,
    fontSize: scaleFromHeight(16),
  },
});
