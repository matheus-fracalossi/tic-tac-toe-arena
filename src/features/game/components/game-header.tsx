import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Avatar } from "./avatar";
import { Text } from "@/components/text";
import { ColorIndicator } from "./color-indicator";
import { COLORS } from "@/theme";

const AVATAR_SIZE = 80;

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
    marginBottom: 40,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
  },
  avatarGroup: {
    alignItems: "center",
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  avatarLabel: {
    color: COLORS.text,
    fontSize: 14,
    letterSpacing: 0.5,
  },
  vsText: {
    color: COLORS.textSecondary,
    fontSize: 20,
  },
});
