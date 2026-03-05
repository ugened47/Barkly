import { TrickCard } from "@/components/TrickCard";
import { Pressable, ScrollView, Text, TextInput, View } from "@/components/tw";
import {
  TRICKS_DATA,
  type Difficulty,
  type Trick,
} from "@/constants/TricksData";
import { useAppStore } from "@/store/useAppStore";
import { isTrickLocked } from "@/utils/premium";
import { router } from "expo-router";
import { useMemo, useState } from "react";

const CATEGORIES = ["Basic Obedience", "Puppy Tricks", "Advanced"] as const;
const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard"];
const DIFFICULTY_ORDER: Record<string, number> = {
  Easy: 0,
  Medium: 1,
  Hard: 2,
};

const CATEGORY_EMOJI: Record<string, string> = {
  "Basic Obedience": "🎓",
  "Puppy Tricks": "🐕",
  Advanced: "🏆",
};

function filterAndSort(
  tricks: Trick[],
  query: string,
  difficulty: Difficulty | "All",
): Trick[] {
  return tricks
    .filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty =
        difficulty === "All" || t.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    })
    .sort(
      (a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty],
    );
}

export default function LibraryScreen() {
  const masteredTricks = useAppStore((s) => s.masteredTricks);
  const isPremium = useAppStore((s) => s.isPremium);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    Difficulty | "All"
  >("All");

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

  const hasResults = CATEGORIES.some(
    (cat) => filteredByCategory[cat].length > 0,
  );

  const progressPct =
    TRICKS_DATA.length > 0
      ? Math.round((masteredTricks.length / TRICKS_DATA.length) * 100)
      : 0;

  function handleTrickPress(trick: Trick) {
    if (isTrickLocked(trick, isPremium)) {
      router.push("/paywall");
    } else {
      router.push(`/trick/${trick.id}`);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-orange-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-16 pb-8">
        <View className="gap-1">
          <Text className="text-3xl font-bold text-stone-900">
            📚 Training Library
          </Text>
          <Text className="text-base text-stone-500">
            {masteredTricks.length} of {TRICKS_DATA.length} tricks mastered ·{" "}
            {progressPct}%
          </Text>
        </View>

        {/* Free-user upsell banner */}
        {!isPremium ? (
          <Pressable
            testID="upsell-banner"
            onPress={() => router.push("/paywall")}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 gap-1"
          >
            <Text className="text-base font-semibold text-amber-800">
              🔒 Unlock all tricks with Premium
            </Text>
            <Text className="text-sm text-amber-700">
              Only the first 3 Basic Obedience tricks are free. Tap to upgrade.
            </Text>
          </Pressable>
        ) : null}

        {/* Search */}
        <TextInput
          className="bg-white rounded-2xl px-4 py-3 text-base text-stone-900 border border-stone-200"
          placeholder="Search tricks…"
          placeholderTextColor="#a8a29e"
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
                  ? "bg-orange-500"
                  : "bg-white border border-stone-200"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedDifficulty === d ? "text-white" : "text-stone-600"
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
                <View className="flex-row items-center gap-2">
                  <Text className="text-2xl">{CATEGORY_EMOJI[category]}</Text>
                  <Text className="text-lg font-bold text-stone-800">
                    {category}
                  </Text>
                </View>
                <View className="gap-2">
                  {filteredByCategory[category].map((trick) => (
                    <TrickCard
                      key={trick.id}
                      trick={trick}
                      mastered={masteredTricks.includes(trick.id)}
                      locked={isTrickLocked(trick, isPremium)}
                      onPress={() => handleTrickPress(trick)}
                    />
                  ))}
                </View>
              </View>
            ) : null,
          )
        ) : (
          <View className="bg-white rounded-2xl p-6 items-center gap-2">
            <Text className="text-4xl">🔍</Text>
            <Text className="text-base font-semibold text-stone-900">
              No tricks found
            </Text>
            <Text className="text-sm text-stone-500 text-center">
              Try a different search or filter.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
