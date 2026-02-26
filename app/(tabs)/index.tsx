import { ScrollView, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-4 px-4 pt-16 pb-8">
        <Text className="text-3xl font-bold text-slate-900">Good morning! 🐾</Text>
        <Text className="text-base text-slate-500">
          Daily goals and streak counter will appear here.
        </Text>
      </View>
    </ScrollView>
  );
}
