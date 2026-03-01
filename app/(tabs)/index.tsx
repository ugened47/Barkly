import { useMemo } from 'react';
import { ScrollView, Text, View } from '@/components/tw';
import { router } from 'expo-router';

import { TrickCard } from '@/components/TrickCard';
import { TRICKS_DATA } from '@/constants/TricksData';
import { useAppStore } from '@/store/useAppStore';

export default function HomeScreen() {
  const streak = useAppStore((s) => s.streak);
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const dogProfile = useAppStore((s) => s.dogProfile);

  const recommendedTricks = useMemo(
    () => TRICKS_DATA.filter((t) => !masteredTricks.includes(t.id)).slice(0, 3),
    [masteredTricks],
  );

  const showOnboarding = dogProfile.name === '';

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">
        <Text className="text-3xl font-bold text-slate-900">Good morning!</Text>

        {/* Onboarding nudge */}
        {showOnboarding ? (
          <View className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 gap-1">
            <Text className="text-base font-semibold text-cyan-800">
              Set up your dog&apos;s profile
            </Text>
            <Text className="text-sm text-cyan-700">
              Visit the Profile tab to add your dog&apos;s name and breed.
            </Text>
          </View>
        ) : null}

        {/* Streak Counter */}
        <View className="bg-white rounded-2xl p-5 gap-2">
          <Text className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Training Streak
          </Text>
          <View className="flex-row items-end gap-2">
            <Text className="text-5xl font-bold text-cyan-500">{streak}</Text>
            <Text className="text-lg text-slate-500 pb-1">
              {streak === 1 ? 'day' : 'days'}
            </Text>
          </View>
          <Text className="text-sm text-slate-500">
            Keep training daily to build your streak!
          </Text>
        </View>

        {/* Practice Today */}
        <View className="gap-3">
          <Text className="text-xl font-bold text-slate-900">Practice Today</Text>

          {recommendedTricks.length > 0 ? (
            <View className="gap-2">
              {recommendedTricks.map((trick) => (
                <TrickCard
                  key={trick.id}
                  trick={trick}
                  mastered={masteredTricks.includes(trick.id)}
                  onPress={() => router.push(`/trick/${trick.id}`)}
                />
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-6 items-center gap-2">
              <Text className="text-lg font-semibold text-slate-900">
                All tricks mastered!
              </Text>
              <Text className="text-sm text-slate-500 text-center">
                You&apos;ve mastered every trick in the library. Keep it up!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
