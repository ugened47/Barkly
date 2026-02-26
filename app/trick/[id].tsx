import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function TrickDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-4 px-4 pt-8 pb-8">
        <Text className="text-3xl font-bold text-slate-900">Trick Detail</Text>
        <Text className="text-sm text-slate-400">ID: {id}</Text>
        <Text className="text-base text-slate-500">
          Step-by-step instructions and "Mark as Mastered" will be implemented in a future step.
        </Text>
      </View>
    </ScrollView>
  );
}
