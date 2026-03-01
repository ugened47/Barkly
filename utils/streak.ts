/**
 * Pure utility functions for streak date logic.
 * Kept separate from the store so they can be unit-tested without React.
 */

/** Returns an ISO date string (YYYY-MM-DD) for the given Date, defaulting to now. */
export function getISODate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Calculates the new streak value given the previous practice date, today's date,
 * and the current streak count.
 *
 * Rules:
 *  - First practice ever          → streak = 1
 *  - Same day as last practice    → streak unchanged
 *  - One day after last practice  → streak + 1
 *  - More than one day gap        → streak resets to 1
 */
export function calculateNewStreak(
  lastPracticeDate: string | null,
  today: string,
  currentStreak: number,
): { streak: number; lastPracticeDate: string } {
  if (!lastPracticeDate) {
    return { streak: 1, lastPracticeDate: today };
  }

  if (lastPracticeDate === today) {
    return { streak: currentStreak, lastPracticeDate: today };
  }

  const last = new Date(lastPracticeDate);
  const now = new Date(today);
  const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { streak: currentStreak + 1, lastPracticeDate: today };
  }

  return { streak: 1, lastPracticeDate: today };
}
