import {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Text, View, AnimatedView } from '@/components/tw';
import { ClickerButton } from '@/components/ClickerButton';

export default function ClickerScreen() {
  const flashOpacity = useSharedValue(0);

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  const handleClick = () => {
    flashOpacity.value = withSequence(
      withTiming(0.4, { duration: 40 }),
      withTiming(0, { duration: 280 }),
    );
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 bg-slate-50">
      <AnimatedView
        pointerEvents="none"
        className="absolute inset-0 bg-cyan-300"
        style={flashStyle}
      />
      <Text className="text-3xl font-bold text-slate-900">Clicker</Text>
      <ClickerButton onPress={handleClick} />
      <Text className="text-sm text-slate-500">Tap to click</Text>
    </View>
  );
}
