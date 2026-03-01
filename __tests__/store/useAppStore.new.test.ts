/**
 * Tests for the new store actions added in the app-improvement pass:
 * recordClick, resetSessionClicks, recordPractice, toggleSound
 */
import { useAppStore } from '@/store/useAppStore';

const FULL_RESET = {
  streak: 0,
  masteredTricks: [] as string[],
  dogProfile: { name: '', breed: '' },
  lastPracticeDate: null as string | null,
  sessionClicks: 0,
  totalClicks: 0,
  soundEnabled: true,
  practicedToday: [] as string[],
};

beforeEach(() => {
  useAppStore.setState(FULL_RESET);
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-03-01T10:00:00.000Z'));
});

afterEach(() => {
  jest.useRealTimers();
});

// ── recordClick ──────────────────────────────────────────────────────────────

describe('recordClick', () => {
  it('increments sessionClicks by 1', () => {
    useAppStore.getState().recordClick();
    expect(useAppStore.getState().sessionClicks).toBe(1);
  });

  it('increments totalClicks by 1', () => {
    useAppStore.getState().recordClick();
    expect(useAppStore.getState().totalClicks).toBe(1);
  });

  it('accumulates both counters over multiple clicks', () => {
    useAppStore.getState().recordClick();
    useAppStore.getState().recordClick();
    useAppStore.getState().recordClick();
    expect(useAppStore.getState().sessionClicks).toBe(3);
    expect(useAppStore.getState().totalClicks).toBe(3);
  });

  it('keeps existing totalClicks when incrementing', () => {
    useAppStore.setState({ totalClicks: 100 });
    useAppStore.getState().recordClick();
    expect(useAppStore.getState().totalClicks).toBe(101);
  });
});

// ── resetSessionClicks ───────────────────────────────────────────────────────

describe('resetSessionClicks', () => {
  it('resets sessionClicks to 0', () => {
    useAppStore.setState({ sessionClicks: 42 });
    useAppStore.getState().resetSessionClicks();
    expect(useAppStore.getState().sessionClicks).toBe(0);
  });

  it('does NOT reset totalClicks', () => {
    useAppStore.setState({ sessionClicks: 10, totalClicks: 50 });
    useAppStore.getState().resetSessionClicks();
    expect(useAppStore.getState().totalClicks).toBe(50);
  });
});

// ── recordPractice ───────────────────────────────────────────────────────────

describe('recordPractice', () => {
  it('sets streak to 1 on the very first practice', () => {
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().streak).toBe(1);
  });

  it('records lastPracticeDate as today', () => {
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().lastPracticeDate).toBe('2026-03-01');
  });

  it('adds the trickId to practicedToday', () => {
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().practicedToday).toContain('sit');
  });

  it('does not add the same trickId twice to practicedToday', () => {
    useAppStore.getState().recordPractice('sit');
    useAppStore.getState().recordPractice('sit');
    const { practicedToday } = useAppStore.getState();
    expect(practicedToday.filter((id) => id === 'sit')).toHaveLength(1);
  });

  it('does not change streak when already practiced today', () => {
    useAppStore.setState({ streak: 5, lastPracticeDate: '2026-03-01', practicedToday: ['stay'] });
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().streak).toBe(5);
  });

  it('increments streak on a consecutive day', () => {
    useAppStore.setState({ streak: 3, lastPracticeDate: '2026-02-28', practicedToday: [] });
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().streak).toBe(4);
  });

  it('resets streak to 1 after missing a day', () => {
    useAppStore.setState({ streak: 10, lastPracticeDate: '2026-02-27', practicedToday: [] });
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().streak).toBe(1);
  });

  it('clears practicedToday from the previous day when a new day starts', () => {
    useAppStore.setState({
      lastPracticeDate: '2026-02-28',
      practicedToday: ['old-trick'],
      streak: 2,
    });
    useAppStore.getState().recordPractice('sit');
    expect(useAppStore.getState().practicedToday).toEqual(['sit']);
    expect(useAppStore.getState().practicedToday).not.toContain('old-trick');
  });

  it('accumulates multiple different tricks in practicedToday on the same day', () => {
    useAppStore.setState({ lastPracticeDate: '2026-03-01', practicedToday: [], streak: 1 });
    useAppStore.getState().recordPractice('sit');
    useAppStore.getState().recordPractice('stay');
    expect(useAppStore.getState().practicedToday).toContain('sit');
    expect(useAppStore.getState().practicedToday).toContain('stay');
  });
});

// ── toggleSound ──────────────────────────────────────────────────────────────

describe('toggleSound', () => {
  it('turns sound off when it was on', () => {
    useAppStore.setState({ soundEnabled: true });
    useAppStore.getState().toggleSound();
    expect(useAppStore.getState().soundEnabled).toBe(false);
  });

  it('turns sound on when it was off', () => {
    useAppStore.setState({ soundEnabled: false });
    useAppStore.getState().toggleSound();
    expect(useAppStore.getState().soundEnabled).toBe(true);
  });

  it('can toggle multiple times', () => {
    useAppStore.setState({ soundEnabled: true });
    useAppStore.getState().toggleSound();
    useAppStore.getState().toggleSound();
    expect(useAppStore.getState().soundEnabled).toBe(true);
  });
});
