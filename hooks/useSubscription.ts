import { useEffect, useState } from 'react';
import { useIAP, type Purchase } from 'expo-iap';
import { useAppStore } from '@/store/useAppStore';
import { PRODUCT_IDS, type ProductOption } from '@/utils/premium';

const SUBSCRIPTION_SKUS = [PRODUCT_IDS.MONTHLY, PRODUCT_IDS.YEARLY];
const ALL_SKUS = [PRODUCT_IDS.MONTHLY, PRODUCT_IDS.YEARLY, PRODUCT_IDS.LIFETIME];

export function useSubscription() {
  const isPremium = useAppStore((s) => s.isPremium);
  const grantPremium = useAppStore((s) => s.grantPremium);
  const revokePremium = useAppStore((s) => s.revokePremium);
  const grantLifetime = useAppStore((s) => s.grantLifetime);

  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const {
    connected,
    products,
    fetchProducts,
    requestPurchase,
    finishTransaction,
    hasActiveSubscriptions,
  } = useIAP({
    onPurchaseSuccess: (purchase: Purchase) => {
      if (purchase.productId === PRODUCT_IDS.LIFETIME) {
        grantLifetime();
      } else {
        grantPremium();
      }
      finishTransaction({ purchase, isConsumable: false });
    },
    onPurchaseError: (error) => setPurchaseError(error.message),
  });

  // Load products and validate existing subscriptions on mount
  useEffect(() => {
    if (!connected) return;

    async function init() {
      try {
        await fetchProducts({ skus: ALL_SKUS });
        const hasSubs = await hasActiveSubscriptions(SUBSCRIPTION_SKUS);
        if (hasSubs) {
          grantPremium();
        } else {
          revokePremium();
        }
      } finally {
        setIsLoadingProducts(false);
      }
    }

    init();
  }, [connected]); // eslint-disable-line react-hooks/exhaustive-deps

  function getProductPrice(sku: string): string | undefined {
    return products.find((p) => p.id === sku)?.displayPrice;
  }

  async function purchase(option: ProductOption) {
    const sku = PRODUCT_IDS[option.toUpperCase() as keyof typeof PRODUCT_IDS];
    const isSubscription = option !== 'lifetime';

    if (isSubscription) {
      await requestPurchase({
        request: {
          apple: { sku },
          google: { skus: [sku] },
        },
        type: 'subs',
      });
    } else {
      await requestPurchase({
        request: {
          apple: { sku },
          google: { skus: [sku] },
        },
        type: 'in-app',
      });
    }
  }

  return {
    isPremium,
    purchase,
    purchaseError,
    isLoadingProducts,
    monthlyPrice: getProductPrice(PRODUCT_IDS.MONTHLY),
    yearlyPrice: getProductPrice(PRODUCT_IDS.YEARLY),
    lifetimePrice: getProductPrice(PRODUCT_IDS.LIFETIME),
  };
}
