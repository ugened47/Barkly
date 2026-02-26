import { Text, View } from 'react-native';

export default function ClickerScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-6 bg-slate-50">
      <Text className="text-3xl font-bold text-slate-900">Clicker</Text>
      <Text className="text-base text-slate-500 text-center px-8">
        The animated clicker button and sound will be implemented in the next step.
      </Text>
    </View>
  );
}
