import { useCallback, useEffect, useRef } from "react";
import type { EventSubscription } from "expo-modules-core";
import { useAudioPlayer, AudioPlayerOptions, AudioSource } from "expo-audio";

type PlayOptions = {
  loop?: boolean;
};

export const useAudio = (options?: AudioPlayerOptions) => {
  const player = useAudioPlayer(null, options);
  const currentSourceRef = useRef<AudioSource | null>(null);
  const pendingLoadSubRef = useRef<EventSubscription | null>(null);

  const cancelPendingLoad = useCallback(() => {
    pendingLoadSubRef.current?.remove();
    pendingLoadSubRef.current = null;
  }, []);

  const play = useCallback(
    (source: AudioSource, { loop = false }: PlayOptions = {}) => {
      cancelPendingLoad();
      player.loop = loop;

      if (currentSourceRef.current === source && player.isLoaded) {
        player.seekTo(0);
        player.play();
        return;
      }

      player.pause();

      if (currentSourceRef.current !== source) {
        player.replace(source);
        currentSourceRef.current = source;
      }

      const startWhenLoaded = () => {
        player.seekTo(0);
        player.play();
      };

      if (player.isLoaded) {
        startWhenLoaded();
        return;
      }

      pendingLoadSubRef.current = player.addListener(
        "playbackStatusUpdate",
        (status) => {
          if (!status.isLoaded) return;
          cancelPendingLoad();
          startWhenLoaded();
        },
      );
    },
    [player, cancelPendingLoad],
  );

  useEffect(() => cancelPendingLoad, [cancelPendingLoad]);

  const stop = useCallback(() => {
    player.pause();
    player.seekTo(0);
  }, [player]);

  const setMuted = useCallback(
    (muted: boolean) => {
      player.muted = muted;
    },
    [player],
  );

  return {
    player,
    play,
    stop,
    setMuted,
  };
};
