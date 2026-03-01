import { useEffect, useRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Pressable, Text } from '@/components/tw';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
  /** Whether the click sound plays on each tap. Defaults to true. */
  soundEnabled?: boolean;
};

export function ClickerButton({ onPress, soundEnabled = true }: Props) {
  const scale = useSharedValue(1);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;
    Audio.Sound.createAsync(require('@/assets/sounds/click.mp3'))
      .then(({ sound }) => {
        if (mounted) {
          soundRef.current = sound;
        } else {
          sound.unloadAsync();
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.88, { damping: 6, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 8, stiffness: 250 });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (soundEnabled) {
      soundRef.current?.replayAsync().catch(() => {});
    }
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
