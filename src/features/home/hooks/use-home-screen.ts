import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from 'expo-router';

import { useAudioContext } from '@/features/audio';
import type { Difficulty } from '@/features/game';
import type { SliderOption } from '@/components/slider';

export type UseHomeScreenResult = {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  difficultyOptions: SliderOption<Difficulty>[];
  language: string;
  changeLanguage: (code: string) => void;
  languageOptions: SliderOption<string>[];
};

const LANGUAGE_OPTIONS: SliderOption<string>[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'pt', label: 'Português' },
];

export function useHomeScreen(): UseHomeScreenResult {
  const { t, i18n } = useTranslation();
  const { playInitialSound } = useAudioContext();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const difficultyOptions = useMemo<SliderOption<Difficulty>[]>(
    () => [
      { value: 'easy', label: t('difficulty.easy') },
      { value: 'hard', label: t('difficulty.hard') },
    ],
    [t],
  );

  const changeLanguage = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
    },
    [i18n],
  );

  useFocusEffect(
    useCallback(() => {
      playInitialSound();
    }, [playInitialSound]),
  );

  return {
    difficulty,
    setDifficulty,
    difficultyOptions,
    language: (i18n.language as string) ?? LANGUAGE_OPTIONS[0].value,
    changeLanguage,
    languageOptions: LANGUAGE_OPTIONS,
  };
}
