import { Dimensions, Platform, StatusBar } from "react-native";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const STANDARD_LENGTH =
  WINDOW_WIDTH > WINDOW_HEIGHT ? WINDOW_WIDTH : WINDOW_HEIGHT;

const isIPhoneWithNotch = (): boolean => {
  if (Platform.OS !== "ios") return false;
  const longSide = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT);
  const shortSide = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT);
  // iPhone X / 11 / 12 / 13 / 14 / 15 / 16 family points
  return (
    (longSide === 812 && shortSide === 375) || // X, XS, 11 Pro, 12 mini, 13 mini
    (longSide === 844 && shortSide === 390) || // 12, 12 Pro, 13, 13 Pro, 14
    (longSide === 852 && shortSide === 393) || // 14 Pro, 15, 15 Pro, 16
    (longSide === 874 && shortSide === 402) || // 16 Pro
    (longSide === 896 && shortSide === 414) || // XR, XS Max, 11, 11 Pro Max
    (longSide === 926 && shortSide === 428) || // 12 Pro Max, 13 Pro Max, 14 Plus
    (longSide === 932 && shortSide === 430) || // 14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus
    (longSide === 956 && shortSide === 440) // 16 Pro Max
  );
};

const getDeviceHeight = (): number => {
  const offset =
    WINDOW_WIDTH > WINDOW_HEIGHT
      ? 0
      : Platform.OS === "ios"
        ? 78
        : (StatusBar.currentHeight ?? 0);

  if (isIPhoneWithNotch() || Platform.OS === "android") {
    return STANDARD_LENGTH - offset;
  }
  return STANDARD_LENGTH;
};

const DEVICE_HEIGHT = getDeviceHeight();

/**
 * Returns a percentage of the screen height.
 */
export function percentOfHeight(percent: number): number {
  return Math.round((percent * DEVICE_HEIGHT) / 100);
}

/**
 * Scales a value based on screen height relative to a baseline device height (680).
 * Use for font sizes and vertical spacing.
 */
export function scaleFromHeight(value: number, baselineHeight = 680): number {
  return Math.round((value * DEVICE_HEIGHT) / baselineHeight);
}

/**
 * Returns a percentage of the screen width.
 */
export function percentOfWidth(percent: number): number {
  return Math.round((percent * WINDOW_WIDTH) / 100);
}

/**
 * Scales a value based on screen width relative to a baseline width (375).
 * Use for horizontal elements like avatars, paddings, gaps.
 */
export function scaleFromWidth(value: number, baselineWidth = 375): number {
  return Math.round((value * WINDOW_WIDTH) / baselineWidth);
}

export const SCREEN_WIDTH = WINDOW_WIDTH;
export const SCREEN_HEIGHT = WINDOW_HEIGHT;
export const IS_SMALL_DEVICE = WINDOW_WIDTH < 360;
