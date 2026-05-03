import { memo } from 'react';

import { StyleSheet, View } from 'react-native';

type ColorIndicatorProps = {
  color: string;
  isActive: boolean;
};

export const ColorIndicator = memo<ColorIndicatorProps>(({ color, isActive }) => {
  return (
    <View style={[styles.indicator, { backgroundColor: color }]} />
  );
});

ColorIndicator.displayName = 'ColorIndicator';

const styles = StyleSheet.create({
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});
