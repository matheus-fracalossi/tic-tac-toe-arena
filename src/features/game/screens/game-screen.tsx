import { memo, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

import { GameHeader } from "../components/game-header";
import { TurnIndicator } from "../components/turn-indicator";
import { Board } from "../components/board";
import { GameActions } from "../components/game-actions";
import { AudioToggleButton } from "@/features/audio";
import { COLORS } from "@/theme";
import { type TicTacToeGameState } from "../hooks/use-tic-tac-toe";
import { Text } from "@/components/text";
import { scaleFromHeight } from "@/utils/responsive";
import type { Difficulty } from "../logic";

import PlayerX from "@/assets/avatars/player-x.png";
import PlayerO from "@/assets/avatars/player-o.png";

type GameMode = "pve" | "pvp";

type GameScreenProps = {
  gameMode: GameMode;
  gameState: TicTacToeGameState;
  difficulty?: Difficulty;
  onRetry: () => void;
  onBackToHome: () => void;
};

const GameScreenComponent = ({
  gameMode,
  gameState,
  difficulty,
  onRetry,
  onBackToHome,
}: GameScreenProps) => {
  const { t } = useTranslation();
  const {
    board,
    currentTurn,
    winner,
    winningLine,
    lastMove,
    isMachineThinking,
    resetCount,
    makeMove,
  } = gameState;

  const playerThemes = useMemo(
    () => ({
      X: {
        image: PlayerX,
        color: COLORS.playerX,
        label: gameMode === "pve" ? t("game.you") : t("game.p1"),
      },
      O: {
        image: PlayerO,
        color: COLORS.playerO,
        label: gameMode === "pve" ? t("game.ai") : t("game.p2"),
      },
    }),
    [gameMode, t],
  );

  const turnIndicatorProps = useMemo(() => {
    if (winner === "draw")
      return { text: t("game.draw"), textColor: COLORS.textSecondary };
    if (winner) {
      const p = playerThemes[winner as "X" | "O"];
      return {
        text:
          gameMode === "pve"
            ? winner === "X"
              ? t("game.youWin")
              : t("game.machineWins")
            : t("game.playerWins", { player: p.label }),
        textColor: p.color,
      };
    }
    if (isMachineThinking)
      return { text: t("game.aiTurn"), glowColor: COLORS.playerO };

    const active = playerThemes[currentTurn as "X" | "O"];
    return {
      text:
        gameMode === "pve"
          ? currentTurn === "X"
            ? t("game.yourTurn")
            : t("game.machineTurn")
          : t("game.playerTurn", { player: active.label }),
      glowColor: active.color,
    };
  }, [winner, isMachineThinking, currentTurn, gameMode, playerThemes, t]);

  return (
    <Animated.View
      entering={FadeIn.duration(600)}
      exiting={FadeOut.duration(300)}
      style={styles.gameContainer}
    >
      {gameMode === "pve" && difficulty && (
        <Text style={styles.difficultyLabel}>
          {t(`difficulty.${difficulty}`)}
        </Text>
      )}
      <GameHeader
        player1={{
          ...playerThemes.X,
          glowColor: playerThemes.X.color,
          isActive: !winner && currentTurn === "X",
        }}
        player2={{
          ...playerThemes.O,
          glowColor: playerThemes.O.color,
          isActive: !winner && currentTurn === "O",
        }}
      />

      <Animated.View style={styles.boardContainer} layout={LinearTransition}>
        <View style={styles.boardWrapper}>
          <TurnIndicator {...turnIndicatorProps} />
          <Board
            board={board}
            winningLine={winningLine}
            lastMove={lastMove}
            currentTurn={currentTurn}
            isMachineThinking={isMachineThinking}
            winner={winner}
            makeMove={makeMove}
            resetCount={resetCount}
          />
          <GameActions
            onRetry={onRetry}
            onBackToHome={onBackToHome}
            showRetry={!!winner}
          />
        </View>
        <AudioToggleButton />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gameContainer: { alignItems: "center", width: "100%" },
  difficultyLabel: {
    fontSize: scaleFromHeight(10),
    color: COLORS.textSecondary,
    marginBottom: scaleFromHeight(14),
  },
  boardContainer: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: scaleFromHeight(120),
    minWidth: "100%",
    gap: scaleFromHeight(28),
  },
  boardWrapper: { alignItems: "center", justifyContent: "center" },
  audioButton: {},
});

export const GameScreen = memo(GameScreenComponent);
