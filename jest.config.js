/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  clearMocks: true,
  setupFiles: ["./jest.setup.ts"],
  moduleNameMapper: {
    // Mock the NativeWind CSS runtime (react-native-css)
    "^react-native-css$": "<rootDir>/__mocks__/react-native-css.js",
    // Mock animation libraries
    "^react-native-reanimated$":
      "<rootDir>/__mocks__/react-native-reanimated.js",
    "^react-native-worklets$": "<rootDir>/__mocks__/react-native-worklets.js",
    // Mock async storage
    "^@react-native-async-storage/async-storage$":
      "@react-native-async-storage/async-storage/jest/async-storage-mock",
    // Mock Expo modules
    "^expo-audio$": "<rootDir>/__mocks__/expo-audio.js",
    "^expo-haptics$": "<rootDir>/__mocks__/expo-haptics.js",
    "^expo-router$": "<rootDir>/__mocks__/expo-router.js",
    // Mock @expo/vector-icons to prevent async font-loading act() warnings
    "^@expo/vector-icons$": "<rootDir>/__mocks__/@expo/vector-icons.js",
    "^@expo/vector-icons/(.*)$": "<rootDir>/__mocks__/@expo/vector-icons.js",
    // Mock expo-iap (native IAP — not available in Jest)
    "^expo-iap$": "<rootDir>/__mocks__/expo-iap.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|react-native-css|react-native-worklets|zustand|tailwind-merge|clsx|expo-iap)",
  ],
};
