import { useMemo } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from '@/components/tw';

import { ProgressBar } from '@/components/ProgressBar';
import { TRICKS_DATA } from '@/constants/TricksData';
import { useAppStore } from '@/store/useAppStore';

export default function ProfileScreen() {
  const dogProfile = useAppStore((s) => s.dogProfile);
  const setDogProfile = useAppStore((s) => s.setDogProfile);
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const soundEnabled = useAppStore((s) => s.soundEnabled);
  const toggleSound = useAppStore((s) => s.toggleSound);

  const masteredTrickObjects = useMemo(
    () => TRICKS_DATA.filter((t) => masteredTricks.includes(t.id)),
    [masteredTricks],
  );

  const progress = TRICKS_DATA.length > 0 ? masteredTricks.length / TRICKS_DATA.length : 0;

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">
        <Text className="text-3xl font-bold text-slate-900">Profile</Text>

        {/* Dog Profile Form */}
        <View className="bg-white rounded-2xl p-5 gap-4">
          <Text className="text-lg font-semibold text-slate-900">Your Dog</Text>

          <View className="gap-1">
            <Text className="text-sm font-medium text-slate-500">Name</Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-base text-slate-900 border border-slate-200"
              placeholder="e.g. Buddy"
              placeholderTextColor="#94a3b8"
              value={dogProfile.name}
              onChangeText={(name) => setDogProfile({ name })}
              returnKeyType="next"
            />
          </View>

          <View className="gap-1">
            <Text className="text-sm font-medium text-slate-500">Breed</Text>
            <TextInput
              className="bg-slate-50 rounded-xl px-4 py-3 text-base text-slate-900 border border-slate-200"
              placeholder="e.g. Golden Retriever"
              placeholderTextColor="#94a3b8"
              value={dogProfile.breed}
              onChangeText={(breed) => setDogProfile({ breed })}
              returnKeyType="done"
            />
          </View>
        </View>

        {/* Settings */}
        <View className="bg-white rounded-2xl p-5 gap-4">
          <Text className="text-lg font-semibold text-slate-900">Settings</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-slate-700">Click Sound</Text>
            <Pressable
              testID="sound-toggle"
              onPress={toggleSound}
              className={`rounded-full px-4 py-2 ${soundEnabled ? 'bg-cyan-500' : 'bg-slate-200'}`}
            >
              <Text
                className={`text-sm font-semibold ${soundEnabled ? 'text-white' : 'text-slate-500'}`}
              >
                {soundEnabled ? 'On' : 'Off'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Mastered Tricks */}
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-slate-900">Mastered Tricks</Text>
            <Text className="text-sm text-slate-500">
              {masteredTrickObjects.length} / {TRICKS_DATA.length}
            </Text>
          </View>

          {/* Progress bar */}
          <ProgressBar value={progress} />

          {masteredTrickObjects.length > 0 ? (
            <View className="bg-white rounded-2xl overflow-hidden">
              {masteredTrickObjects.map((trick, index) => (
                <View
                  key={trick.id}
                  className={`flex-row items-center justify-between px-4 py-3${index < masteredTrickObjects.length - 1 ? ' border-b border-slate-100' : ''}`}
                >
                  <Text className="text-base font-medium text-slate-900">
                    {trick.name}
                  </Text>
                  <Text className="text-sm text-slate-500">{trick.category}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-6 items-center gap-2">
              <Text className="text-base font-semibold text-slate-900">
                No tricks mastered yet
              </Text>
              <Text className="text-sm text-slate-500 text-center">
                Head to the Library tab to start training!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
