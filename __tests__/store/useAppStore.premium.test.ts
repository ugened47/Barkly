import { useAppStore } from '@/store/useAppStore';

// Reset premium fields between tests
beforeEach(() => {
  useAppStore.setState({
    isPremium: false,
    hasLifetimePurchase: false,
    premiumValidatedAt: null,
  });
});

describe('grantPremium', () => {
  it('sets isPremium to true', () => {
    useAppStore.getState().grantPremium();
    expect(useAppStore.getState().isPremium).toBe(true);
  });

  it('sets premiumValidatedAt to a recent ISO timestamp', () => {
    const before = Date.now();
    useAppStore.getState().grantPremium();
    const after = Date.now();
    const ts = useAppStore.getState().premiumValidatedAt;
    expect(ts).not.toBeNull();
    const ms = new Date(ts!).getTime();
    expect(ms).toBeGreaterThanOrEqual(before);
    expect(ms).toBeLessThanOrEqual(after);
  });
});

describe('revokePremium', () => {
  it('sets isPremium to false when no lifetime purchase', () => {
    useAppStore.getState().grantPremium();
    useAppStore.getState().revokePremium();
    expect(useAppStore.getState().isPremium).toBe(false);
  });

  it('does NOT revoke isPremium when hasLifetimePurchase is true', () => {
    useAppStore.getState().grantLifetime();
    useAppStore.getState().revokePremium();
    expect(useAppStore.getState().isPremium).toBe(true);
  });
});

describe('grantLifetime', () => {
  it('sets isPremium and hasLifetimePurchase to true', () => {
    useAppStore.getState().grantLifetime();
    const state = useAppStore.getState();
    expect(state.isPremium).toBe(true);
    expect(state.hasLifetimePurchase).toBe(true);
  });

  it('sets premiumValidatedAt', () => {
    useAppStore.getState().grantLifetime();
    expect(useAppStore.getState().premiumValidatedAt).not.toBeNull();
  });
});

describe('setPremiumValidatedAt', () => {
  it('stores the provided ISO date', () => {
    const date = '2026-03-05T12:00:00.000Z';
    useAppStore.getState().setPremiumValidatedAt(date);
    expect(useAppStore.getState().premiumValidatedAt).toBe(date);
  });
});

describe('initial state', () => {
  it('starts with isPremium = false', () => {
    expect(useAppStore.getState().isPremium).toBe(false);
  });

  it('starts with hasLifetimePurchase = false', () => {
    expect(useAppStore.getState().hasLifetimePurchase).toBe(false);
  });

  it('starts with premiumValidatedAt = null', () => {
    expect(useAppStore.getState().premiumValidatedAt).toBeNull();
  });
});
