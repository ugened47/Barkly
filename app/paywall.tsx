import { useEffect } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { Pressable, ScrollView, Text, View } from '@/components/tw';
import { router } from 'expo-router';
import { useSubscription } from '@/hooks/useSubscription';
import type { ProductOption } from '@/utils/premium';

const FEATURES = [
  '🐾 All tricks unlocked — Basic, Puppy & Advanced',
  '📊 Detailed training statistics',
  '🔥 Streak & progress tracking',
  '🎯 Personalized recommendations',
];

type PlanRowProps = {
  label: string;
  price?: string;
  badge?: string;
  highlighted?: boolean;
  onPress: () => void;
};

function PlanRow({ label, price, badge, highlighted, onPress }: PlanRowProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-2xl p-4 gap-1 ${highlighted ? 'bg-orange-500' : 'bg-white border border-stone-200'}`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className={`text-base font-semibold ${highlighted ? 'text-white' : 'text-stone-900'}`}>
            {label}
          </Text>
          {badge ? (
            <View className="bg-amber-400 rounded-full px-2 py-0.5">
              <Text className="text-xs font-bold text-amber-900">{badge}</Text>
            </View>
          ) : null}
        </View>
        <Text className={`text-base font-bold ${highlighted ? 'text-white' : 'text-orange-500'}`}>
          {price ?? '—'}
        </Text>
      </View>
    </Pressable>
  );
}

export default function PaywallScreen() {
  const { isPremium, purchase, purchaseError, isLoadingProducts, monthlyPrice, yearlyPrice, lifetimePrice } =
    useSubscription();

  // Auto-dismiss when premium is granted
  useEffect(() => {
    if (isPremium) {
      router.back();
    }
  }, [isPremium]);

  // Show purchase errors as alert
  useEffect(() => {
    if (purchaseError) {
      Alert.alert('Purchase failed', purchaseError);
    }
  }, [purchaseError]);

  async function handlePurchase(option: ProductOption) {
    try {
      await purchase(option);
    } catch {
      // errors surfaced via onPurchaseError → purchaseError state
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-orange-50"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="flex-1 gap-6 px-4 pt-10 pb-10">
        {/* Header */}
        <View className="items-center gap-3">
          <Text className="text-5xl">🏆</Text>
          <Text className="text-3xl font-bold text-stone-900 text-center">
            Unlock Barkly Premium
          </Text>
          <Text className="text-base text-stone-500 text-center">
            Train smarter with access to all tricks and advanced stats.
          </Text>
        </View>

        {/* Feature list */}
        <View className="bg-white rounded-2xl p-5 gap-3">
          {FEATURES.map((feature) => (
            <Text key={feature} className="text-base text-stone-700">
              {feature}
            </Text>
          ))}
        </View>

        {/* Plans */}
        {isLoadingProducts ? (
          <View className="py-8 items-center">
            <ActivityIndicator color="#f97316" />
          </View>
        ) : (
          <View className="gap-3">
            <PlanRow
              label="Annual"
              price={yearlyPrice}
              badge="Best Value"
              highlighted
              onPress={() => handlePurchase('yearly')}
            />
            <PlanRow
              label="Monthly"
              price={monthlyPrice}
              onPress={() => handlePurchase('monthly')}
            />
            <PlanRow
              label="Lifetime"
              price={lifetimePrice}
              onPress={() => handlePurchase('lifetime')}
            />
          </View>
        )}

        <Text className="text-xs text-stone-400 text-center">
          Subscriptions auto-renew. Cancel anytime in App Store / Google Play settings.
        </Text>
      </View>
    </ScrollView>
  );
}
