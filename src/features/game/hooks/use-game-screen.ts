import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import type { PIConfettiMethods } from "react-native-fast-confetti";

import { useAudioContext } from "@/features/audio";
import { COLORS } from "@/theme";

import { useTicTacToe, type TicTacToeGameState } from "./use-tic-tac-toe";
import type { Difficulty, GameMode } from "../logic";

export type UseGameScreenOptions = {
  gameMode: GameMode;
  difficulty: Difficulty;
};

export type UseGameScreenResult = {
  gameState: TicTacToeGameState;
  confettiRef: RefObject<PIConfettiMethods | null>;
  showConfetti: boolean;
  confettiColors: string[];
};

const PLAYER_O_CONFETTI = [
  COLORS.playerO,
  COLORS.playerOLight,
  COLORS.playerOTransparent,
  "rgba(255, 180, 171, 0.4)",
  "rgba(255, 180, 171, 0.6)",
];

const PLAYER_X_CONFETTI = [
  COLORS.playerX,
  COLORS.playerXLight,
  COLORS.playerXTransparent,
  COLORS.playerXHighlight,
  COLORS.playerXHighlightStrong,
];

export function useGameScreen({
  gameMode,
  difficulty,
}: UseGameScreenOptions): UseGameScreenResult {
  const { playBattleSound, playWinSound, playGameOverSound } =
    useAudioContext();
  const confettiRef = useRef<PIConfettiMethods>(null);

  const gameState = useTicTacToe({ gameMode, difficulty });
  const { winner, resetCount } = gameState;

  useEffect(() => {
    playBattleSound();
  }, [resetCount, playBattleSound]);

  useEffect(() => {
    if (!winner || winner === "draw") return;

    const isPlayerWin =
      winner === "X" || (winner === "O" && gameMode === "pvp");

    if (isPlayerWin) {
      confettiRef.current?.restart();
      playWinSound();
    } else {
      playGameOverSound();
    }
  }, [winner, gameMode, playWinSound, playGameOverSound]);

  const confettiColors = useMemo(
    () => (winner === "O" ? PLAYER_O_CONFETTI : PLAYER_X_CONFETTI),
    [winner],
  );

  return {
    gameState,
    confettiRef,
    showConfetti: !!winner && winner !== "draw",
    confettiColors,
  };
}
