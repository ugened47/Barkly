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

  // Reset the session counter when the user leaves this screen
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
      withTiming(0.4, { duration: 40 }),
      withTiming(0, { duration: 280 }),
    );
    recordClick();
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-slate-50">
      <AnimatedView
        pointerEvents="none"
        className="absolute inset-0 bg-cyan-300"
        style={flashStyle}
      />
      <Text className="text-3xl font-bold text-slate-900">Clicker</Text>

      {/* Session counter */}
      <View className="items-center gap-1">
        <Text className="text-6xl font-bold text-cyan-500">{sessionClicks}</Text>
        <Text className="text-sm text-slate-500">taps this session</Text>
      </View>

      <ClickerButton onPress={handleClick} soundEnabled={soundEnabled} />
      <Text className="text-sm text-slate-500">Tap to click</Text>
    </View>
  );
}
