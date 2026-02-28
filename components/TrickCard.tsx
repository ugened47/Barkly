import React from 'react';
import { Pressable, Text, View } from '@/components/tw';
import type { Trick } from '@/constants/TricksData';

type Props = {
  trick: Trick;
  mastered: boolean;
  onPress: () => void;
};

const difficultyColor: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-700',
  Medium: 'bg-amber-100 text-amber-700',
  Hard: 'bg-red-100 text-red-700',
};

export const TrickCard = React.memo(function TrickCard({
  trick,
  mastered,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 active:opacity-70"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-semibold text-slate-900">
              {trick.name}
            </Text>
            {mastered ? (
              <Text className="text-sm">✓</Text>
            ) : null}
          </View>
          <Text className="text-sm text-slate-500">
            {trick.steps.length} steps
          </Text>
        </View>
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
    </Pressable>
  );
});
