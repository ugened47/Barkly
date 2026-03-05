import {
  FREE_BASIC_OBEDIENCE_LIMIT,
  getFreeTrickIds,
  isTrickLocked,
  partitionTricks,
} from '@/utils/premium';
import { TRICKS_DATA, type Trick } from '@/constants/TricksData';

const BASIC_TRICKS = TRICKS_DATA.filter((t) => t.category === 'Basic Obedience');
const ADVANCED_TRICKS = TRICKS_DATA.filter((t) => t.category === 'Advanced');
const PUPPY_TRICKS = TRICKS_DATA.filter((t) => t.category === 'Puppy Tricks');

describe('FREE_BASIC_OBEDIENCE_LIMIT', () => {
  it('equals 3', () => {
    expect(FREE_BASIC_OBEDIENCE_LIMIT).toBe(3);
  });
});

describe('getFreeTrickIds', () => {
  it('returns exactly 3 IDs', () => {
    const ids = getFreeTrickIds();
    expect(ids).toHaveLength(3);
  });

  it('returns IDs of the first 3 Basic Obedience tricks', () => {
    const ids = getFreeTrickIds();
    const expected = BASIC_TRICKS.slice(0, 3).map((t) => t.id);
    expect(ids).toEqual(expected);
  });

  it('returns an array of strings', () => {
    const ids = getFreeTrickIds();
    ids.forEach((id) => expect(typeof id).toBe('string'));
  });
});

describe('isTrickLocked', () => {
  describe('when isPremium = true', () => {
    it('returns false for any Basic Obedience trick', () => {
      BASIC_TRICKS.forEach((t) => {
        expect(isTrickLocked(t, true)).toBe(false);
      });
    });

    it('returns false for Advanced tricks', () => {
      ADVANCED_TRICKS.forEach((t) => {
        expect(isTrickLocked(t, true)).toBe(false);
      });
    });

    it('returns false for Puppy Tricks', () => {
      PUPPY_TRICKS.forEach((t) => {
        expect(isTrickLocked(t, true)).toBe(false);
      });
    });
  });

  describe('when isPremium = false', () => {
    it('returns false for the first 3 Basic Obedience tricks', () => {
      const freeTricks = BASIC_TRICKS.slice(0, FREE_BASIC_OBEDIENCE_LIMIT);
      freeTricks.forEach((t) => {
        expect(isTrickLocked(t, false)).toBe(false);
      });
    });

    it('returns true for Basic Obedience tricks beyond the free limit', () => {
      const lockedBasic = BASIC_TRICKS.slice(FREE_BASIC_OBEDIENCE_LIMIT);
      lockedBasic.forEach((t) => {
        expect(isTrickLocked(t, false)).toBe(true);
      });
    });

    it('returns true for all Advanced tricks', () => {
      ADVANCED_TRICKS.forEach((t) => {
        expect(isTrickLocked(t, false)).toBe(true);
      });
    });

    it('returns true for all Puppy Tricks', () => {
      PUPPY_TRICKS.forEach((t) => {
        expect(isTrickLocked(t, false)).toBe(true);
      });
    });
  });
});

describe('partitionTricks', () => {
  it('returns all tricks as free when isPremium = true', () => {
    const { free, locked } = partitionTricks(TRICKS_DATA, true);
    expect(free).toHaveLength(TRICKS_DATA.length);
    expect(locked).toHaveLength(0);
  });

  it('returns only free tricks unlocked when isPremium = false', () => {
    const { free, locked } = partitionTricks(TRICKS_DATA, false);
    expect(free.length + locked.length).toBe(TRICKS_DATA.length);
    free.forEach((t) => expect(isTrickLocked(t, false)).toBe(false));
    locked.forEach((t) => expect(isTrickLocked(t, false)).toBe(true));
  });

  it('correctly partitions a custom subset', () => {
    const subset: Trick[] = [BASIC_TRICKS[0], ADVANCED_TRICKS[0]];
    const { free, locked } = partitionTricks(subset, false);
    expect(free).toContain(BASIC_TRICKS[0]);
    expect(locked).toContain(ADVANCED_TRICKS[0]);
  });
});
