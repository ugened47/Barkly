# Product Requirements Document (PRD): Barkly (Dog Training App MVP)

## 1. Product Overview
**Barkly** is a mobile dog training application that helps dog owners train their pets using a built-in clicker, step-by-step training programs, and progress tracking. The MVP will focus on the core features that provide immediate value: an accessible clicker, a library of basic commands, and simple local progress tracking.

## 2. Target Audience
Dog owners (mostly beginners) who want to train their puppies or adult dogs at home using positive reinforcement without hiring a professional trainer.

## 3. Core Features (MVP Scope)

### 3.1. Built-in Clicker (The Core Utility)
- **Functionality:** A prominent, easily accessible button that plays a distinct "click" sound.
- **Visual Feedback:** The screen must flash or show a visual pulse animation when clicked, catering to deaf dogs and providing immediate feedback.
- **Accessibility:** Must be available as the center tab in the bottom navigation bar so it can be accessed instantly.

### 3.2. Training Library (Programs & Tricks)
- **Categories:** Basic Obedience, Puppy Tricks, Advanced.
- **Trick Detail Screen:**
  - Title and difficulty level.
  - Step-by-step text instructions.
  - A placeholder area for an illustration/icon.
  - A "Mark as Mastered" button to track progress.

### 3.3. Daily Goals & Home Screen
- A dashboard showing a few recommended tricks to practice today.
- A simple streak counter (tracking consecutive days the user has opened the app or completed a trick).

### 3.4. Progress Tracking (Profile)
- A list of "Mastered Tricks".
- Basic Dog profile settings (Name, Breed, Age).

## 4. Technical Architecture & Constraints

### 4.1. Tech Stack (Strict Requirements)
- **Framework:** React Native + Expo (Latest SDK).
- **Environment Constraint:** MUST be 100% compatible with **Expo Go**. Do not use any bare React Native CLI modules or libraries that require custom native code compilation.
- **Routing:** Expo Router (File-based routing, `app/` directory).
- **State Management:** Zustand (lightweight, for global states like streaks and mastered tricks).
- **Storage:** `@react-native-async-storage/async-storage` for persisting Zustand state locally.
- **Animations:** `react-native-reanimated` (v3).
- **Audio:** `expo-av` for handling the clicker sound effect.
- **Styling:** **NativeWind v4** (Tailwind CSS utility classes via `className` prop). Replaces plain `StyleSheet` for all layout and visual styling. Requires `tailwind.config.js`, `global.css`, and `metro.config.js` setup. Compatible with Expo Go — no custom native code needed.

### 4.2. File & Folder Structure
Follow standard Expo Router conventions:
```text
tailwind.config.js     # NativeWind/Tailwind configuration
metro.config.js        # Metro bundler config (required for NativeWind)
global.css             # Tailwind directives (@tailwind base/components/utilities)
/app
  /_layout.tsx           # Global provider layout (Zustand, Theme)
  /(tabs)                # Main tab navigation
    /_layout.tsx         # Tab bar configuration
    /index.tsx           # Home Screen (Daily Goals & Streaks)
    /library.tsx         # Training Library Screen
    /clicker.tsx         # Full-screen Clicker Screen (Center Tab)
    /profile.tsx         # User/Dog Profile & Progress
  /trick/[id].tsx        # Dynamic route for Trick Details
/components
  /ClickerButton.tsx     # Reusable animated clicker logic
  /TrickCard.tsx         # UI component for trick lists
/store
  /useAppStore.ts        # Zustand store (persisted)
/constants
  /Colors.ts             # Theme colors (also maps to Tailwind theme tokens)
  /TricksData.ts         # Mocked JSON data for tricks
```

### 4.3. Design & UX Guidelines
- **UI Paradigm:** Clean, playful, highly legible. Large touch targets (crucial when holding a dog and a phone).
- **Colors:** Playful palette (primary action color like Cyan/Blue, soft backgrounds). Define as Tailwind theme tokens in `tailwind.config.js` and mirror in `constants/Colors.ts`.
- **Navigation:** Bottom Tab Bar for core sections (use Expo Router's native tabs via `expo-router/unstable-native-tabs`), Stack navigation (native stack) for drilling into trick details.
- **Styling Rules** (from `vercel-react-native-skills`):
  - Use `borderCurve: 'continuous'` alongside any `borderRadius` for smooth iOS-style corners.
  - Use `gap` on parent containers instead of `margin` on children for spacing.
  - Use `Pressable` (from `react-native`) instead of `TouchableOpacity` or `TouchableHighlight`.
  - For animated press interactions (scale, opacity), use `GestureDetector` + Reanimated shared values.
  - Animate only `transform` and `opacity` properties for GPU-accelerated animations.

## 5. Out of Scope for MVP
- Backend database (everything is stored locally via AsyncStorage).
- User authentication/login.
- Video submission to real trainers.
- Paid premium subscriptions.

## 6. AI Agent Instructions
When writing code for this project:
1. Ensure all imports match the specified tech stack.
2. Build iteratively. Do not try to implement the entire PRD in one commit.
3. Prioritize functional, unstyled structure first, then apply NativeWind `className` props for styling. Use `StyleSheet.create` only for dynamic/computed values that Tailwind cannot express (e.g., animated `transform` values).
4. Always handle basic error states (e.g., if the audio file fails to load in expo-av).
5. Follow the `vercel-react-native-skills` ruleset installed at `.agents/skills/vercel-react-native-skills/`. Key rules:
   - **List performance:** Memoize list items (`React.memo`), avoid inline style objects and anonymous callbacks inside render.
   - **Animations:** Only animate `transform`/`opacity`; use `useDerivedValue` for computed animation values.
   - **Navigation:** Expo Router uses native stack by default — do not import `@react-navigation/stack`.
   - **Pressables:** Always use `Pressable`, never `TouchableOpacity`.
   - **Rendering:** Never use falsy `&&` for conditional rendering (e.g., `{count && <View/>}`) — use a ternary or explicit boolean check instead.
