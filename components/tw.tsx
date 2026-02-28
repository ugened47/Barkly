import { useCssElement } from 'react-native-css';
import React from 'react';
import {
  View as RNView,
  Text as RNText,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  TextInput as RNTextInput,
} from 'react-native';
import Animated from 'react-native-reanimated';

export const View = (
  props: React.ComponentProps<typeof RNView> & { className?: string },
) => useCssElement(RNView, props, { className: 'style' });

export const Text = (
  props: React.ComponentProps<typeof RNText> & { className?: string },
) => useCssElement(RNText, props, { className: 'style' });

export const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & { className?: string },
) => useCssElement(RNPressable, props, { className: 'style' });

export const ScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  },
) =>
  useCssElement(RNScrollView, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
  });

export const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & { className?: string },
) => useCssElement(RNTextInput, props, { className: 'style' });

export const AnimatedView = (
  props: React.ComponentProps<typeof Animated.View> & { className?: string },
) => useCssElement(Animated.View, props, { className: 'style' });
