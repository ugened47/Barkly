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
- **Styling:** Standard React Native `StyleSheet`.

### 4.2. File & Folder Structure
Follow standard Expo Router conventions:
```text
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
  /Colors.ts             # Theme colors
  /TricksData.ts         # Mocked JSON data for tricks
```
