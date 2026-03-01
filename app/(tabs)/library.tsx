import { useState, useMemo } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from '@/components/tw';
import { router } from 'expo-router';
import { TRICKS_DATA, type Trick, type Difficulty } from '@/constants/TricksData';
import { TrickCard } from '@/components/TrickCard';
import { useAppStore } from '@/store/useAppStore';

const CATEGORIES = ['Basic Obedience', 'Puppy Tricks', 'Advanced'] as const;
const DIFFICULTIES: Array<Difficulty | 'All'> = ['All', 'Easy', 'Medium', 'Hard'];
const DIFFICULTY_ORDER: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

function filterAndSort(
  tricks: Trick[],
  query: string,
  difficulty: Difficulty | 'All',
): Trick[] {
  return tricks
    .filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty = difficulty === 'All' || t.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
}

export default function LibraryScreen() {
  const masteredTricks = useAppStore((s) => s.masteredTricks);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All');

  const filteredByCategory = useMemo(() => {
    const result: Record<string, Trick[]> = {};
    for (const cat of CATEGORIES) {
      result[cat] = filterAndSort(
        TRICKS_DATA.filter((t) => t.category === cat),
        searchQuery,
        selectedDifficulty,
      );
    }
    return result;
  }, [searchQuery, selectedDifficulty]);

  const hasResults = CATEGORIES.some((cat) => filteredByCategory[cat].length > 0);

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-slate-900">Training Library</Text>
          <Text className="text-base text-slate-500">
            {masteredTricks.length} of {TRICKS_DATA.length} tricks mastered
          </Text>
        </View>

        {/* Search */}
        <TextInput
          className="bg-white rounded-xl px-4 py-3 text-base text-slate-900 border border-slate-200"
          placeholder="Search tricks…"
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />

        {/* Difficulty filter */}
        <View className="flex-row gap-2">
          {DIFFICULTIES.map((d) => (
            <Pressable
              key={d}
              testID={`filter-${d}`}
              onPress={() => setSelectedDifficulty(d)}
              className={`rounded-full px-4 py-2 ${
                selectedDifficulty === d
                  ? 'bg-cyan-500'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedDifficulty === d ? 'text-white' : 'text-slate-600'
                }`}
              >
                {d}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Results */}
        {hasResults ? (
          CATEGORIES.map((category) =>
            filteredByCategory[category].length > 0 ? (
              <View key={category} className="gap-3">
                <Text className="text-lg font-semibold text-slate-700">{category}</Text>
                <View className="gap-2">
                  {filteredByCategory[category].map((trick) => (
                    <TrickCard
                      key={trick.id}
                      trick={trick}
                      mastered={masteredTricks.includes(trick.id)}
                      onPress={() => router.push(`/trick/${trick.id}`)}
                    />
                  ))}
                </View>
              </View>
            ) : null,
          )
        ) : (
          <View className="bg-white rounded-2xl p-6 items-center gap-2">
            <Text className="text-base font-semibold text-slate-900">No tricks found</Text>
            <Text className="text-sm text-slate-500 text-center">
              Try a different search or filter.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
