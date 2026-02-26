import { ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';
import { TRICKS_DATA, type Trick } from '@/constants/TricksData';
import { TrickCard } from '@/components/TrickCard';
import { useAppStore } from '@/store/useAppStore';

const CATEGORIES = ['Basic Obedience', 'Puppy Tricks', 'Advanced'] as const;

function groupByCategory(tricks: Trick[]) {
  const grouped: Record<string, Trick[]> = {};
  for (const cat of CATEGORIES) {
    grouped[cat] = tricks.filter((t) => t.category === cat);
  }
  return grouped;
}

export default function LibraryScreen() {
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const grouped = groupByCategory(TRICKS_DATA);

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-slate-900">
            Training Library
          </Text>
          <Text className="text-base text-slate-500">
            {masteredTricks.length} of {TRICKS_DATA.length} tricks mastered
          </Text>
        </View>

        {CATEGORIES.map((category) => (
          <View key={category} className="gap-3">
            <Text className="text-lg font-semibold text-slate-700">
              {category}
            </Text>
            <View className="gap-2">
              {grouped[category].map((trick) => (
                <TrickCard
                  key={trick.id}
                  trick={trick}
                  mastered={masteredTricks.includes(trick.id)}
                  onPress={() => router.push(`/trick/${trick.id}`)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
