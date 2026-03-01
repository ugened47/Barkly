/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  clearMocks: true,
  setupFiles: ['./jest.setup.ts'],
  moduleNameMapper: {
    // Mock the NativeWind CSS runtime (react-native-css)
    '^react-native-css$': '<rootDir>/__mocks__/react-native-css.js',
    // Mock animation libraries
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    '^react-native-worklets$': '<rootDir>/__mocks__/react-native-worklets.js',
    // Mock async storage
    '^@react-native-async-storage/async-storage$':
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
    // Mock Expo modules
    '^expo-av$': '<rootDir>/__mocks__/expo-av.js',
    '^expo-haptics$': '<rootDir>/__mocks__/expo-haptics.js',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|nativewind|react-native-css|react-native-worklets|zustand|tailwind-merge|clsx)',
  ],
};
