import React from 'react';
import { Pressable, Text, View } from '@/components/tw';
import type { Trick } from '@/constants/TricksData';

type Props = {
  trick: Trick;
  mastered: boolean;
  onPress: () => void;
};

const DIFFICULTY_STYLE: Record<string, { badge: string; text: string; emoji: string }> = {
  Easy:   { badge: 'bg-emerald-100', text: 'text-emerald-700', emoji: '🟢' },
  Medium: { badge: 'bg-amber-100',   text: 'text-amber-700',   emoji: '🟡' },
  Hard:   { badge: 'bg-red-100',     text: 'text-red-700',     emoji: '🔴' },
};

export const TrickCard = React.memo(function TrickCard({
  trick,
  mastered,
  onPress,
}: Props) {
  const style = DIFFICULTY_STYLE[trick.difficulty];

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 active:opacity-70"
    >
      <View className="flex-row items-center gap-3">
        {/* Left: emoji + text */}
        <View className="flex-1 gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-semibold text-stone-900">
              {trick.name}
            </Text>
            {mastered ? (
              <Text className="text-sm">⭐</Text>
            ) : null}
          </View>
          <Text className="text-sm text-stone-400">
            {trick.steps.length} steps
          </Text>
        </View>

        {/* Right: difficulty badge */}
        <View className={`rounded-full px-3 py-1 ${style.badge}`}>
          <Text className={`text-xs font-semibold ${style.text}`}>
            {style.emoji} {trick.difficulty}
          </Text>
        </View>
      </View>
    </Pressable>
  );
});
