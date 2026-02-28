/**
 * Custom mock for react-native-reanimated v4.
 * Replaces animations with no-ops so components render synchronously in tests.
 */
const { View, Text, Image, ScrollView } = require('react-native');

const Animated = {
  View,
  Text,
  Image,
  ScrollView,
  createAnimatedComponent: (Component) => Component,
};

module.exports = {
  __esModule: true,
  default: Animated,

  // Shared values
  useSharedValue: (initialValue) => ({ value: initialValue }),

  // Animated styles — call factory immediately so components render
  useAnimatedStyle: (factory) => {
    try {
      return factory();
    } catch {
      return {};
    }
  },

  // Animation drivers — return the target value instantly
  withSpring: (toValue) => toValue,
  withTiming: (toValue) => toValue,
  withSequence: (...values) => values[values.length - 1],
  withDelay: (_delay, animation) => animation,
  withRepeat: (animation) => animation,

  // Thread utilities
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,

  // Easing
  Easing: {
    linear: (t) => t,
    ease: (t) => t,
    bezier: () => () => 0,
    in: (fn) => fn,
    out: (fn) => fn,
    inOut: (fn) => fn,
  },

  // Re-export Animated members at top level for convenience
  createAnimatedComponent: (Component) => Component,
  View,
  Text,
  Image,
  ScrollView,
};
