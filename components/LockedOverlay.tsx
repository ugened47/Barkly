import React from 'react';
import { Pressable, Text, View } from '@/components/tw';

type Props = {
  onUnlock: () => void;
};

export const LockedOverlay = React.memo(function LockedOverlay({ onUnlock }: Props) {
  return (
    <Pressable
      onPress={onUnlock}
      className="absolute inset-0 rounded-2xl items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
    >
      <View className="items-center gap-1">
        <Text className="text-2xl">🔒</Text>
        <View className="bg-amber-400 rounded-full px-3 py-0.5">
          <Text className="text-xs font-bold text-amber-900">Premium</Text>
        </View>
      </View>
    </Pressable>
  );
});
