import { Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function ClickerButton({ onPress }: { onPress?: () => void }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.88, { damping: 6, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 8, stiffness: 250 });
    });
    onPress?.();
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={handlePress}
      className="items-center justify-center w-56 h-56 rounded-full bg-cyan-500 shadow-lg"
    >
      <Text className="text-white text-3xl font-bold tracking-widest">CLICK</Text>
    </AnimatedPressable>
  );
}
