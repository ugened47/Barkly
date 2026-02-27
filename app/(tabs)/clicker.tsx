import { Text, View } from 'react-native';
import { ClickerButton } from '@/components/ClickerButton';

export default function ClickerScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-slate-50">
      <Text className="text-3xl font-bold text-slate-900">Clicker</Text>
      <ClickerButton />
      <Text className="text-sm text-slate-500">Tap to click</Text>
    </View>
  );
}
