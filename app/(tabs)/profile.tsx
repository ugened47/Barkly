import { useMemo } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from '@/components/tw';
import { Ionicons } from '@expo/vector-icons';

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
      className="flex-1 bg-orange-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">

        {/* Dog Avatar + Header */}
        <View className="items-center gap-3">
          <View className="w-24 h-24 rounded-full bg-orange-100 items-center justify-center">
            <Text className="text-5xl">🐶</Text>
          </View>
          <View className="items-center gap-0.5">
            <Text className="text-2xl font-bold text-stone-900">
              {dogProfile.name ? dogProfile.name : 'Your Dog'}
            </Text>
            {dogProfile.breed ? (
              <Text className="text-base text-stone-500">{dogProfile.breed}</Text>
            ) : null}
          </View>
        </View>

        {/* Dog Profile Form */}
        <View className="bg-white rounded-2xl p-5 gap-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-xl">🦴</Text>
            <Text className="text-lg font-semibold text-stone-900">Your Dog</Text>
          </View>

          <View className="gap-1">
            <Text className="text-sm font-medium text-stone-500">Name</Text>
            <TextInput
              className="bg-orange-50 rounded-xl px-4 py-3 text-base text-stone-900 border border-stone-200"
              placeholder="e.g. Buddy"
              placeholderTextColor="#a8a29e"
              value={dogProfile.name}
              onChangeText={(name) => setDogProfile({ name })}
              returnKeyType="next"
            />
          </View>

          <View className="gap-1">
            <Text className="text-sm font-medium text-stone-500">Breed</Text>
            <TextInput
              className="bg-orange-50 rounded-xl px-4 py-3 text-base text-stone-900 border border-stone-200"
              placeholder="e.g. Golden Retriever"
              placeholderTextColor="#a8a29e"
              value={dogProfile.breed}
              onChangeText={(breed) => setDogProfile({ breed })}
              returnKeyType="done"
            />
          </View>
        </View>

        {/* Settings */}
        <View className="bg-white rounded-2xl p-5 gap-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-xl">⚙️</Text>
            <Text className="text-lg font-semibold text-stone-900">Settings</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="volume-medium-outline" size={20} color="#78716c" />
              <Text className="text-base text-stone-700">Click Sound</Text>
            </View>
            <Pressable
              testID="sound-toggle"
              onPress={toggleSound}
              className={`rounded-full px-4 py-2 ${soundEnabled ? 'bg-orange-500' : 'bg-stone-200'}`}
            >
              <Text
                className={`text-sm font-semibold ${soundEnabled ? 'text-white' : 'text-stone-500'}`}
              >
                {soundEnabled ? 'On' : 'Off'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Mastered Tricks */}
        <View className="gap-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-xl">🏆</Text>
              <Text className="text-xl font-bold text-stone-900">Mastered Tricks</Text>
            </View>
            <Text className="text-sm text-stone-500">
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
                  className={`flex-row items-center justify-between px-4 py-3${index < masteredTrickObjects.length - 1 ? ' border-b border-stone-100' : ''}`}
                >
                  <View className="flex-row items-center gap-2">
                    <Text className="text-base">⭐</Text>
                    <Text className="text-base font-medium text-stone-900">
                      {trick.name}
                    </Text>
                  </View>
                  <Text className="text-sm text-stone-500">{trick.category}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="bg-white rounded-2xl p-6 items-center gap-2">
              <Text className="text-4xl">🐾</Text>
              <Text className="text-base font-semibold text-stone-900">
                No tricks mastered yet
              </Text>
              <Text className="text-sm text-stone-500 text-center">
                Head to the Library tab to start training!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
