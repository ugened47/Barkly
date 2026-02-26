// Placeholder — full styling and press interaction added in a future step.
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { Trick } from '@/constants/TricksData';

type Props = {
  trick: Trick;
  onPress: () => void;
};

export const TrickCard = React.memo(function TrickCard({ trick, onPress }: Props) {
  return (
    <Pressable onPress={onPress} className="p-4 bg-white rounded-2xl">
      <View className="gap-1">
        <Text className="text-base font-semibold text-slate-900">{trick.name}</Text>
        <Text className="text-sm text-slate-500">{trick.category}</Text>
      </View>
    </Pressable>
  );
});
