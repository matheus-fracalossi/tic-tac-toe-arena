/**
 * Turn indicator component that shows whose turn it is as a badge
 */

import { memo } from 'react';

import { StyleSheet, View } from 'react-native';

import { COLORS } from '@/theme';
import { Text } from '@/components/text';

export type TurnIndicatorProps = {
  text: string;
  glowColor?: string;
  textColor?: string;
};

export const TurnIndicator = memo<TurnIndicatorProps>(
  ({ text, glowColor, textColor }) => {
    const glowStyle = glowColor ? {
      borderColor: glowColor,
    } : {};

    return (
      <View style={styles.container}>
        <View style={[styles.badge, glowStyle]}>
          <Text style={[styles.text, { color: textColor || COLORS.text }]}>
            {text}
          </Text>
        </View>
      </View>
    );
  },
);

TurnIndicator.displayName = 'TurnIndicator';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignSelf: 'center',
    flexShrink: 0,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
