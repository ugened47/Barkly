import { Pressable, ScrollView, Text, View } from '@/components/tw';
import { useLocalSearchParams } from 'expo-router';
import { TRICKS_DATA } from '@/constants/TricksData';
import { useAppStore } from '@/store/useAppStore';

const difficultyColor: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
};

export default function TrickDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const trick = TRICKS_DATA.find((t) => t.id === id);
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const toggleMastered = useAppStore((s) => s.toggleMastered);
  const practicedToday = useAppStore((s) => s.practicedToday);
  const recordPractice = useAppStore((s) => s.recordPractice);

  if (!trick) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-lg text-slate-500">Trick not found.</Text>
      </View>
    );
  }

  const isMastered = masteredTricks.includes(trick.id);
  const isPracticedToday = practicedToday.includes(trick.id);

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-8 pb-8">
        <View className="gap-2">
          <View className="flex-row items-center gap-3">
            <Text className="text-3xl font-bold text-slate-900">
              {trick.name}
            </Text>
            <View
              className={`rounded-full px-3 py-1 ${difficultyColor[trick.difficulty]}`}
            >
              <Text
                className={`text-xs font-medium ${difficultyColor[trick.difficulty]}`}
              >
                {trick.difficulty}
              </Text>
            </View>
          </View>
          <Text className="text-base text-slate-500">{trick.category}</Text>
        </View>

        <View className="gap-3">
          <Text className="text-lg font-semibold text-slate-700">Steps</Text>
          {trick.steps.map((step, index) => (
            <View
              key={index}
              className="flex-row gap-3 bg-white rounded-xl p-4"
            >
              <View className="h-7 w-7 items-center justify-center rounded-full bg-cyan-100">
                <Text className="text-sm font-semibold text-cyan-700">
                  {index + 1}
                </Text>
              </View>
              <Text className="flex-1 text-base text-slate-700 leading-6">
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Practiced Today */}
        <Pressable
          onPress={() => {
            if (!isPracticedToday) recordPractice(trick.id);
          }}
          className={`rounded-2xl py-4 items-center ${isPracticedToday ? 'bg-emerald-100' : 'bg-slate-100'}`}
        >
          <Text
            className={`text-base font-semibold ${isPracticedToday ? 'text-emerald-700' : 'text-slate-600'}`}
          >
            {isPracticedToday ? 'Practiced ✓' : 'Practiced Today'}
          </Text>
        </Pressable>

        {/* Mark as Mastered */}
        <Pressable
          onPress={() => toggleMastered(trick.id)}
          className={`rounded-2xl py-4 items-center ${isMastered ? 'bg-slate-200' : 'bg-cyan-500'}`}
        >
          <Text
            className={`text-base font-semibold ${isMastered ? 'text-slate-600' : 'text-white'}`}
          >
            {isMastered ? 'Mastered ✓' : 'Mark as Mastered'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
