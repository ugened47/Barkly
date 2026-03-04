import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Text, View, AnimatedView } from '@/components/tw';
import { ClickerButton } from '@/components/ClickerButton';
import { useAppStore } from '@/store/useAppStore';

export default function ClickerScreen() {
  const flashOpacity = useSharedValue(0);
  const sessionClicks = useAppStore((s) => s.sessionClicks);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const recordClick = useAppStore((s) => s.recordClick);
  const resetSessionClicks = useAppStore((s) => s.resetSessionClicks);

  useEffect(() => {
    return () => {
      resetSessionClicks();
    };
  }, [resetSessionClicks]);

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  const handleClick = () => {
    flashOpacity.value = withSequence(
      withTiming(0.3, { duration: 40 }),
      withTiming(0, { duration: 280 }),
    );
    recordClick();
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-orange-50">
      {/* Orange flash overlay */}
      <AnimatedView
        pointerEvents="none"
        className="absolute inset-0 bg-orange-300"
        style={flashStyle}
      />

      {/* Decorative paws */}
      <View className="absolute top-20 left-6 opacity-10">
        <Text className="text-7xl">🐾</Text>
      </View>
      <View className="absolute top-32 right-4 opacity-10">
        <Text className="text-5xl">🐾</Text>
      </View>
      <View className="absolute bottom-32 left-10 opacity-10">
        <Text className="text-6xl">🐾</Text>
      </View>
      <View className="absolute bottom-20 right-8 opacity-10">
        <Text className="text-4xl">🐾</Text>
      </View>

      <Text className="text-4xl font-bold text-stone-900">Clicker 🐾</Text>

      {/* Session counter */}
      <View className="items-center gap-1">
        <Text className="text-7xl font-bold text-orange-500">{sessionClicks}</Text>
        <Text className="text-base text-stone-500">taps this session</Text>
      </View>

      <ClickerButton onPress={handleClick} soundEnabled={soundEnabled} />
      <Text className="text-sm text-stone-400">Tap to click</Text>
    </View>
  );
}
