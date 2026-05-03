import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

import "@/i18n";
import { AudioProvider } from "@/features/audio";

import PlayerX from "@/assets/avatars/player-x.png";
import PlayerO from "@/assets/avatars/player-o.png";

const stackOptions = {
  headerShown: false,
  animation: "fade_from_bottom" as const,
};

function cacheImages(images: (string | number)[]) {
  return images.map((image) =>
    typeof image === "string"
      ? Image.prefetch(image)
      : Asset.fromModule(image).downloadAsync(),
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadResources() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Promise.all(cacheImages([PlayerX, PlayerO]));
      } catch (e) {
        console.warn(e);
      } finally {
        if (cancelled) return;
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResources();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!appIsReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AudioProvider>
        <Stack screenOptions={stackOptions} />
      </AudioProvider>
    </GestureHandlerRootView>
  );
}
