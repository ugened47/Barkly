import { getISODate, calculateNewStreak } from '@/utils/streak';

describe('getISODate', () => {
  it('returns a YYYY-MM-DD formatted string', () => {
    const date = new Date('2026-03-01T12:00:00.000Z');
    expect(getISODate(date)).toBe('2026-03-01');
  });

  it('defaults to today when no argument given', () => {
    expect(getISODate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('calculateNewStreak', () => {
  it('starts streak at 1 for the very first practice', () => {
    expect(calculateNewStreak(null, '2026-03-01', 0)).toEqual({
      streak: 1,
      lastPracticeDate: '2026-03-01',
    });
  });

  it('preserves streak when practicing again on the same day', () => {
    expect(calculateNewStreak('2026-03-01', '2026-03-01', 5)).toEqual({
      streak: 5,
      lastPracticeDate: '2026-03-01',
    });
  });

  it('increments streak by 1 on a consecutive day', () => {
    expect(calculateNewStreak('2026-03-01', '2026-03-02', 4)).toEqual({
      streak: 5,
      lastPracticeDate: '2026-03-02',
    });
  });

  it('resets streak to 1 after missing one day', () => {
    expect(calculateNewStreak('2026-03-01', '2026-03-03', 7)).toEqual({
      streak: 1,
      lastPracticeDate: '2026-03-03',
    });
  });

  it('resets streak to 1 after missing many days', () => {
    expect(calculateNewStreak('2026-01-01', '2026-03-01', 30)).toEqual({
      streak: 1,
      lastPracticeDate: '2026-03-01',
    });
  });

  it('handles month boundaries correctly as consecutive days', () => {
    expect(calculateNewStreak('2026-02-28', '2026-03-01', 3)).toEqual({
      streak: 4,
      lastPracticeDate: '2026-03-01',
    });
  });
});
