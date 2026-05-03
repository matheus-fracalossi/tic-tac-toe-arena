import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import { COLORS } from "../theme";
import { Text } from "./text";
import { scaleFromHeight, scaleFromWidth } from "../utils/responsive";

export type SliderOption<T extends string> = {
  value: T;
  label: string;
};

type SliderProps<T extends string> = {
  options: SliderOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function Slider<T extends string>({
  options,
  value,
  onChange,
}: SliderProps<T>) {
  const currentIndex = options.findIndex((o) => o.value === value);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const handlePrevious = () => {
    setDirection("right");
    const newIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
    onChange(options[newIndex].value);
  };

  const handleNext = () => {
    setDirection("left");
    const newIndex = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
    onChange(options[newIndex].value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrevious}>
        <Text style={styles.arrow}>{`<`}</Text>
      </TouchableOpacity>
      <Animated.View
        key={value}
        entering={
          direction === "left"
            ? FadeInLeft.duration(300)
            : FadeInRight.duration(300)
        }
        style={styles.item}
      >
        <Text style={styles.itemText}>
          {options[currentIndex]?.label ?? ""}
        </Text>
      </Animated.View>
      <TouchableOpacity onPress={handleNext}>
        <Text style={styles.arrow}>{`>`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaleFromWidth(10),
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleFromHeight(10),
    minWidth: scaleFromWidth(150),
  },
  itemText: {
    fontSize: scaleFromHeight(9),
    color: COLORS.playerX,
  },
  arrow: {
    fontSize: scaleFromHeight(14),
    color: COLORS.textSecondary,
  },
});
