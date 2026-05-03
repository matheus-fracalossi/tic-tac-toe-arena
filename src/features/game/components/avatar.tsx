import { Image, StyleSheet, View } from "react-native";

import { memo } from "react";

import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/theme";

type AvatarProps = {
  size?: number;
  image: any;
  glowColor: string;
  isActive?: boolean;
  flipHorizontal?: boolean;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const Avatar = memo<AvatarProps>(
  ({ size = 60, image, glowColor, isActive = false, flipHorizontal = false }) => {
    const glowOpacity = useDerivedValue(() => {
      if (!isActive) return 0;
      return withRepeat(
        withSequence(
          withTiming(0.5, { duration: 800 }),
          withTiming(1, { duration: 800 }),
        ),
        -1,
        true,
      );
    }, [isActive]);

    const glowScale = useDerivedValue(() => {
      if (!isActive) return 1;
      return withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(1.1, { duration: 800 }),
        ),
        -1,
        true,
      );
    }, [isActive]);

    const platformGlowStyle = {};

    const glowStyle = useAnimatedStyle(() => {
      return {
        opacity: glowOpacity.value,
        transform: [{ scale: glowScale.value }],
        borderColor: glowColor,
        borderWidth: 4,
        ...platformGlowStyle,
      };
    }, [glowOpacity, glowScale, glowColor, platformGlowStyle]);

    return (
      <View style={[styles.wrapper, { width: size + 8, height: size + 8 }]}>
        <AnimatedView
          style={[
            styles.glow,
            { width: size, height: size, borderRadius: size / 2 },
            glowStyle,
          ]}
        />
        <View
          style={[
            styles.container,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Image
            source={image}
            style={[
              { width: size, height: size },
              flipHorizontal && { transform: [{ scaleX: -1 }] },
            ]}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  },
);

Avatar.displayName = "Avatar";

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  glow: {
    position: "absolute",
    borderWidth: 3,
  },
  container: {
    alignItems: "center",
    backgroundColor: COLORS.surfaceHighlight,
    borderColor: COLORS.border,
    borderWidth: 2,
    justifyContent: "center",
    zIndex: 1,
    overflow: "hidden",
  },
});
