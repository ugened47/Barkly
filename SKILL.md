---
name: Barkly
description: >
  React Native + Expo dog training app using NativeWind v4 styling, Expo Router
  (file-based), Zustand + AsyncStorage for state, and expo-av for audio. Apply
  when building any screen, component, or store for this project.
---

# Barkly — Agent Skill

## When to use

Apply this skill when working on any code in the Barkly project: screens,
components, stores, constants, or configuration files.

## Tech Stack

- **Framework:** React Native + Expo (latest SDK), Expo Go compatible
- **Routing:** Expo Router (file-based, `app/` directory)
- **Styling:** NativeWind v4 — use `className` props; avoid plain `StyleSheet` except for dynamic/animated values
- **State:** Zustand with `@react-native-async-storage/async-storage` persistence
- **Animations:** `react-native-reanimated` v3 — animate only `transform` and `opacity`
- **Audio:** `expo-av`

## Instructions

1. Use `className` (NativeWind/Tailwind) for all static styling. Only use `StyleSheet.create` for values computed at runtime (e.g., animation interpolations).
2. Use `Pressable` from `react-native` — never `TouchableOpacity` or `TouchableHighlight`.
3. Use `gap` on parent containers for spacing instead of `margin` on children.
4. Add `borderCurve: 'continuous'` whenever using `borderRadius`.
5. Avoid falsy `&&` in JSX — use ternaries (`condition ? <A/> : null`) instead.
6. Memoize list item components with `React.memo`; avoid inline objects/callbacks in render.
7. Handle loading and error states for all async operations (audio, AsyncStorage).
8. Expo Router's `Stack` uses the native stack by default — do not import `@react-navigation/stack`.
