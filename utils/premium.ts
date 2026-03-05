import { TRICKS_DATA, type Trick } from '@/constants/TricksData';

export const FREE_BASIC_OBEDIENCE_LIMIT = 3;

export const PRODUCT_IDS = {
  MONTHLY: 'barkly_premium_monthly',
  YEARLY: 'barkly_premium_yearly',
  LIFETIME: 'barkly_premium_lifetime',
} as const;

export type ProductOption = 'monthly' | 'yearly' | 'lifetime';

/** Returns the IDs of the first FREE_BASIC_OBEDIENCE_LIMIT Basic Obedience tricks. */
export function getFreeTrickIds(): string[] {
  return TRICKS_DATA
    .filter((t) => t.category === 'Basic Obedience')
    .slice(0, FREE_BASIC_OBEDIENCE_LIMIT)
    .map((t) => t.id);
}

/** Returns true if the trick is locked for the given subscription state. */
export function isTrickLocked(trick: Trick, isPremium: boolean): boolean {
  if (isPremium) return false;
  const freeTrickIds = getFreeTrickIds();
  return !freeTrickIds.includes(trick.id);
}

/** Splits a trick list into free and locked arrays. */
export function partitionTricks(
  tricks: Trick[],
  isPremium: boolean,
): { free: Trick[]; locked: Trick[] } {
  const free: Trick[] = [];
  const locked: Trick[] = [];
  for (const trick of tricks) {
    if (isTrickLocked(trick, isPremium)) {
      locked.push(trick);
    } else {
      free.push(trick);
    }
  }
  return { free, locked };
}
