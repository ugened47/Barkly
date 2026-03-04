import { Pressable, ScrollView, Text, View } from '@/components/tw';
import { useLocalSearchParams } from 'expo-router';
import { TRICKS_DATA } from '@/constants/TricksData';
import { useAppStore } from '@/store/useAppStore';

const DIFFICULTY_STYLE: Record<string, { badge: string; text: string; emoji: string }> = {
  Easy:   { badge: 'bg-emerald-100', text: 'text-emerald-700', emoji: '🟢' },
  Medium: { badge: 'bg-amber-100',   text: 'text-amber-700',   emoji: '🟡' },
  Hard:   { badge: 'bg-red-100',     text: 'text-red-700',     emoji: '🔴' },
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
      <View className="flex-1 items-center justify-center bg-orange-50">
        <Text className="text-4xl mb-2">🐾</Text>
        <Text className="text-lg text-stone-500">Trick not found.</Text>
      </View>
    );
  }

  const isMastered = masteredTricks.includes(trick.id);
  const isPracticedToday = practicedToday.includes(trick.id);
  const style = DIFFICULTY_STYLE[trick.difficulty];

  return (
    <ScrollView
      className="flex-1 bg-orange-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-8 pb-8">

        {/* Header */}
        <View className="gap-3">
          <View className="flex-row items-center gap-3 flex-wrap">
            <Text className="text-3xl font-bold text-stone-900">
              {trick.name}
            </Text>
            <View className={`rounded-full px-3 py-1 ${style.badge}`}>
              <Text className={`text-xs font-semibold ${style.text}`}>
                {style.emoji} {trick.difficulty}
              </Text>
            </View>
          </View>
          <Text className="text-base text-stone-500">{trick.category}</Text>
        </View>

        {/* Steps */}
        <View className="gap-3">
          <Text className="text-lg font-semibold text-stone-700">🐾 Steps</Text>
          {trick.steps.map((step, index) => (
            <View
              key={index}
              className="flex-row gap-3 bg-white rounded-2xl p-4"
            >
              <View className="h-7 w-7 items-center justify-center rounded-full bg-orange-100">
                <Text className="text-sm font-bold text-orange-600">
                  {index + 1}
                </Text>
              </View>
              <Text className="flex-1 text-base text-stone-700 leading-6">
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
          className={`rounded-2xl py-4 items-center ${isPracticedToday ? 'bg-emerald-100' : 'bg-orange-100'}`}
        >
          <Text
            className={`text-base font-semibold ${isPracticedToday ? 'text-emerald-700' : 'text-orange-700'}`}
          >
            {isPracticedToday ? '✅ Practiced today!' : '🎯 Practiced Today'}
          </Text>
        </Pressable>

        {/* Mark as Mastered */}
        <Pressable
          onPress={() => toggleMastered(trick.id)}
          className={`rounded-2xl py-4 items-center ${isMastered ? 'bg-stone-200' : 'bg-orange-500'}`}
        >
          <Text
            className={`text-base font-semibold ${isMastered ? 'text-stone-600' : 'text-white'}`}
          >
            {isMastered ? '⭐ Mastered!' : '🏆 Mark as Mastered'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
