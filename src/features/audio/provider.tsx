import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";

import { useAudio } from "./hooks/use-audio";
import {
  INITIAL_SOUND,
  BATTLE_SOUND,
  WIN_SOUND,
  GAME_OVER_SOUND,
} from "./assets";

interface AudioContextType {
  playInitialSound: () => void;
  playBattleSound: () => void;
  playWinSound: () => void;
  playGameOverSound: () => void;
  stopSound: () => void;
  toggleAudio: () => void;
  isMuted: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const { play, stop, setMuted } = useAudio();
  const [isMuted, setIsMuted] = useState(false);

  const stopSound = useCallback(() => stop(), [stop]);

  const playInitialSound = useCallback(
    () => play(INITIAL_SOUND, { loop: true }),
    [play],
  );
  const playBattleSound = useCallback(
    () => play(BATTLE_SOUND, { loop: true }),
    [play],
  );
  const playWinSound = useCallback(() => play(WIN_SOUND), [play]);
  const playGameOverSound = useCallback(() => play(GAME_OVER_SOUND), [play]);

  const toggleAudio = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      setMuted(next);
      return next;
    });
  }, [setMuted]);

  const contextValue = useMemo(
    () => ({
      playInitialSound,
      playBattleSound,
      playWinSound,
      playGameOverSound,
      stopSound,
      toggleAudio,
      isMuted,
    }),
    [
      playInitialSound,
      playBattleSound,
      playWinSound,
      playGameOverSound,
      stopSound,
      toggleAudio,
      isMuted,
    ],
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};
