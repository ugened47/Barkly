import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from '@/components/tw';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { TrickCard } from '@/components/TrickCard';
import { TRICKS_DATA } from '@/constants/TricksData';
import { useAppStore } from '@/store/useAppStore';
import { isTrickLocked } from '@/utils/premium';

export default function HomeScreen() {
  const streak = useAppStore((s) => s.streak);
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const dogProfile = useAppStore((s) => s.dogProfile);
  const isPremium = useAppStore((s) => s.isPremium);

  const recommendedTricks = useMemo(
    () =>
      TRICKS_DATA
        .filter((t) => !masteredTricks.includes(t.id) && !isTrickLocked(t, isPremium))
        .slice(0, 3),
    [masteredTricks, isPremium],
  );

  const showOnboarding = dogProfile.name === '';
  const greeting = dogProfile.name ? `Hi, ${dogProfile.name}'s human! 👋` : 'Good morning! 👋';

  return (
    <ScrollView
      className="flex-1 bg-orange-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">

        {/* Hero */}
        <View className="gap-1">
          <Text className="text-4xl">🐶</Text>
          <Text className="text-3xl font-bold text-stone-900">{greeting}</Text>
          <Text className="text-base text-stone-500">Ready to train today?</Text>
        </View>

        {/* Onboarding nudge */}
        {showOnboarding ? (
          <View className="bg-orange-100 border border-orange-200 rounded-2xl p-4 gap-1">
            <Text className="text-base font-semibold text-orange-800">
              🐾 Set up your dog&apos;s profile
            </Text>
            <Text className="text-sm text-orange-700">
              Visit the Profile tab to add your dog&apos;s name and breed.
            </Text>
          </View>
        ) : null}

        {/* Streak Counter */}
        <View className="bg-orange-500 rounded-3xl p-5 gap-2">
          <View className="flex-row items-center gap-2">
            <Ionicons name="flame" size={18} color="rgba(255,255,255,0.8)" />
            <Text className="text-xs font-semibold text-orange-100 uppercase tracking-widest">
              Training Streak
            </Text>
          </View>
          <View className="flex-row items-end gap-2">
            <Text className="text-6xl font-bold text-white">{streak}</Text>
            <Text className="text-xl text-orange-200 pb-1">
              {streak === 1 ? 'day' : 'days'}
            </Text>
          </View>
          <Text className="text-sm text-orange-100">
            Keep training daily to build your streak!
          </Text>
        </View>

        {/* Practice Today */}
        <View className="gap-3">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons name="paw" size={20} color="#f97316" />
            <Text className="text-xl font-bold text-stone-900">Practice Today</Text>
          </View>

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
            <View className="bg-white rounded-2xl p-6 items-center gap-3">
              <Text className="text-4xl">🏆</Text>
              <Text className="text-lg font-semibold text-stone-900">
                All tricks mastered!
              </Text>
              <Text className="text-sm text-stone-500 text-center">
                You&apos;ve mastered every trick in the library. Keep it up!
              </Text>
            </View>
          )}

          {/* Soft upsell nudge for free users */}
          {!isPremium ? (
            <Pressable
              testID="home-upsell"
              onPress={() => router.push('/paywall')}
              className="bg-white border border-stone-200 rounded-2xl p-4 flex-row items-center gap-3"
            >
              <Text className="text-2xl">🔒</Text>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-stone-800">
                  More tricks available with Premium
                </Text>
                <Text className="text-xs text-stone-500">Tap to unlock all tricks</Text>
              </View>
              <Text className="text-stone-400">›</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
