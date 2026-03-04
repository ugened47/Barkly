import { Pressable, Text } from "@/components/tw";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
  /** Whether the click sound plays on each tap. Defaults to true. */
  soundEnabled?: boolean;
};

const clickSound = require("@/assets/sounds/click.mp3");

export function ClickerButton({ onPress, soundEnabled = true }: Props) {
  const scale = useSharedValue(1);
  const player = useAudioPlayer(clickSound);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.88, { damping: 6, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 8, stiffness: 250 });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (soundEnabled) {
      player.seekTo(0);
      player.play();
    }
    onPress?.();
  };

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={handlePress}
      className="items-center justify-center w-56 h-56 rounded-full bg-orange-500 shadow-lg"
    >
      <Text className="text-white text-3xl font-bold tracking-widest">
        CLICK
      </Text>
    </AnimatedPressable>
  );
}
