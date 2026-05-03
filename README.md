# Tic Tac Toe Arena

A classic Tic Tac Toe game built with React Native and Expo, featuring retro pixel-art design, sound effects, and internationalization support.

## Preview

![Video Preview](./assets/video-preview/video-preview.gif)

*Note: The low FPS in the preview is due to GIF compression limitations. The actual app runs smoothly.*

## Prerequisites

Set up your React Native development environment following the [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/).

> **⚠️ Important:** Choose the **Development Build** option during setup. Expo Go won't work properly with this app due to custom font requirements.

## Quick Start

```bash
npm install
npx expo prebuild
npm run start
```

Then install dev build on device:

```bash
npm run ios      # iOS simulator/device
npm run android  # Android emulator/device
```

## Features

- **Retro UI** - Pixel-art graphics with Press Start 2P font
- **Sound Effects** - Background music and game sounds
- **i18n Support** - Multi-language ready
- **Animations** - Smooth transitions and confetti effects

## Tech Stack

- React Native 0.81
- Expo 54
- TypeScript
- Expo Router (file-based routing)
- i18next (internationalization)
- Expo Audio

## Project Structure

```
src/
├── app/          # Screens (file-based routing)
├── components/   # Reusable UI components
├── features/     # Feature modules (game, audio, home)
└── i18n/         # Translations
```

## Scripts

- `npm start` - Start development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm test` - Run tests
- `npm run lint` - Lint code
