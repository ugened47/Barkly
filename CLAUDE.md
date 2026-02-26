# Barkly - AI Assistant Guide

## Project Overview

Barkly is a dog training mobile app built with React Native and Expo. It provides a built-in clicker, training library, daily goals dashboard, and progress tracking. The MVP is local-only (no backend), targeting beginner dog owners.

**Tech Stack:** React Native 0.81.5 · React 19 · Expo SDK (expo-router ~6.0) · NativeWind v5 · Zustand v5 · AsyncStorage · react-native-reanimated v4 · expo-av

## Repository Structure

```
Barkly/
├── app/                        # Expo Router file-based routes
│   ├── _layout.tsx             # Root Stack layout (imports global.css)
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Bottom tab bar (4 tabs)
│   │   ├── index.tsx           # Home / daily goals
│   │   ├── clicker.tsx         # Animated clicker screen
│   │   ├── library.tsx         # Trick library listing
│   │   └── profile.tsx         # Dog profile & progress
│   └── trick/
│       └── [id].tsx            # Dynamic trick detail page
├── components/                 # Shared UI components
│   ├── ClickerButton.tsx       # Pressable clicker button (animated)
│   └── TrickCard.tsx           # Memoized trick list card
├── constants/
│   ├── Colors.ts               # Design token color palette
│   └── TricksData.ts           # Trick type definitions & mock data
├── hooks/
│   ├── use-color-scheme.ts     # Re-export from react-native
│   ├── use-color-scheme.web.ts # Web SSR-safe color scheme hook
│   └── use-theme-color.ts      # Theme color helper (currently unused)
├── store/
│   └── useAppStore.ts          # Zustand global store
├── assets/images/              # App icons and images
├── global.css                  # Tailwind + NativeWind CSS entry
├── app.json                    # Expo app configuration
├── metro.config.js             # Metro bundler (NativeWind middleware)
├── postcss.config.mjs          # PostCSS for Tailwind v4
├── tsconfig.json               # TypeScript (strict, @/* alias)
├── PRD.md                      # Product requirements document
└── SKILL.md                    # Agent skill card summary
```

## Development Commands

```bash
npx expo start          # Start dev server (Expo Go compatible)
npx expo start --ios    # iOS simulator
npx expo start --android # Android emulator
npx expo start --web    # Web browser
npx expo lint           # Run ESLint
```

No test runner is configured. The `scripts/reset-project.js` utility resets placeholder content.

## Styling — NativeWind v5 (Tailwind CSS v4)

**All styling uses `className` props. Never use `StyleSheet.create` or inline style objects.**

### Core Rules

1. **`className` only** — use Tailwind utility classes on every component.
2. **`gap` for spacing** — use `gap-*` on parent containers instead of `margin` on children.
3. **`borderCurve="continuous"` on every `View` with `rounded-*`** — matches iOS squircle style.
4. **No falsy `&&`** — use ternaries for conditional rendering to avoid React Native rendering `0`.
5. **`Pressable` only** — never use `TouchableOpacity` or `TouchableHighlight`.

### Design Tokens (`constants/Colors.ts`)

| Token | Value | Tailwind Equivalent |
|-------|-------|---------------------|
| Primary | `#06b6d4` | `cyan-500` |
| Primary light | `#67e8f9` | `cyan-300` |
| Primary dark | `#0891b2` | `cyan-600` |
| Background | `#f8fafc` | `slate-50` |
| Text primary | `#0f172a` | `slate-900` |
| Text muted | `#64748b` | `slate-500` |
| Border | `#e2e8f0` | `slate-200` |

Use the Tailwind semantic equivalents (`bg-cyan-500`, `text-slate-900`, etc.) in `className` props rather than importing the `Colors` object directly.

### Example Component Pattern

```tsx
import { Pressable, Text, View } from 'react-native';

export const ExampleCard = React.memo(({ title }: { title: string }) => (
  <View className="bg-white rounded-2xl p-4 gap-2" borderCurve="continuous">
    <Text className="text-slate-900 text-lg font-semibold">{title}</Text>
    <Pressable className="bg-cyan-500 rounded-xl px-4 py-2 items-center">
      <Text className="text-white font-medium">Action</Text>
    </Pressable>
  </View>
));
```

## State Management — Zustand v5

State lives in `store/useAppStore.ts`. The store is currently empty and ready for expansion.

**Planned state shape (per PRD):**
- `streak` — daily training streak count
- `masteredTricks` — set of completed trick IDs
- `dogProfile` — name, breed, avatar

**Pattern:** Persist the entire store with `zustand/middleware` and `AsyncStorage`:

```ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppStore = create(
  persist(
    (set) => ({
      // state + actions here
    }),
    { name: 'barkly-store', storage: createJSONStorage(() => AsyncStorage) }
  )
);
```

## Data Layer

`constants/TricksData.ts` defines the `Trick` type and exports `TRICKS_DATA` (currently empty array):

```ts
type Trick = {
  id: string;
  name: string;
  category: 'Basic Obedience' | 'Puppy Tricks' | 'Advanced';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  steps: string[];
};
```

Populate `TRICKS_DATA` with real trick entries — no backend is required for the MVP.

## Navigation — Expo Router v6

File-based routing. Route structure:

| File | Route | Description |
|------|-------|-------------|
| `app/(tabs)/index.tsx` | `/` | Home (daily goals) |
| `app/(tabs)/library.tsx` | `/library` | Trick library |
| `app/(tabs)/clicker.tsx` | `/clicker` | Clicker |
| `app/(tabs)/profile.tsx` | `/profile` | Profile |
| `app/trick/[id].tsx` | `/trick/:id` | Trick detail |

Navigate programmatically with `expo-router`:

```ts
import { router } from 'expo-router';
router.push(`/trick/${trick.id}`);
```

## Animations — react-native-reanimated v4

Use `useSharedValue`, `useAnimatedStyle`, and `withSpring` / `withTiming` for the clicker press effect and any other animations. Keep animation logic inside components; do not derive animated values in the store.

```ts
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
const handlePress = () => { scale.value = withSpring(0.9, {}, () => { scale.value = withSpring(1); }); };
```

## Audio — expo-av

Use `expo-av` for the clicker sound. Load and unload sound objects in `useEffect`:

```ts
import { Audio } from 'expo-av';

useEffect(() => {
  let sound: Audio.Sound;
  Audio.Sound.createAsync(require('@/assets/sounds/click.mp3'))
    .then(({ sound: s }) => { sound = s; });
  return () => { sound?.unloadAsync(); };
}, []);
```

## TypeScript Conventions

- **Strict mode** is enabled — no implicit `any`.
- Use the `@/*` path alias for all absolute imports: `import { Colors } from '@/constants/Colors'`.
- Platform-specific files use the `.web.ts` / `.native.ts` suffix convention.
- Export components as named exports (not default) except for route files which must use default exports.
- Route files **must** use `export default`.

## Component Conventions

- **`React.memo`** all list-item components (e.g., `TrickCard`).
- Keep components focused — extract sub-components when a component exceeds ~80 lines.
- Co-locate a component's types at the top of its file.
- Prefer functional components with hooks; no class components.

## Known Issues

- `hooks/use-theme-color.ts` references `@/constants/theme` which does not exist. This file is currently unused — do not import it until the reference is fixed.
- `constants/TricksData.ts` has an empty `TRICKS_DATA` array — the library screen will be blank until this is populated.
- No `tailwind.config.ts` file exists; Tailwind v4 works with zero-config defaults, which is intentional.

## Out of Scope (MVP)

- Backend / remote API
- User authentication
- Video submission / review
- Subscriptions or payments

Do not add backend infrastructure, auth flows, or remote networking code unless explicitly requested.

## Git Workflow

- Default development branch: `master`
- Feature branches follow the pattern `claude/<description>-<id>`
- Commit messages should be short, imperative, and descriptive
