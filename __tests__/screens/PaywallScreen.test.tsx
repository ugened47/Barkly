import React from 'react';
import { render, screen } from '@testing-library/react-native';

// Mock useSubscription to control its output
jest.mock('@/hooks/useSubscription', () => ({
  useSubscription: jest.fn(() => ({
    isPremium: false,
    purchase: jest.fn(),
    purchaseError: null,
    isLoadingProducts: false,
    monthlyPrice: '$4.99',
    yearlyPrice: '$29.99',
    lifetimePrice: '$49.99',
  })),
}));

import PaywallScreen from '@/app/paywall';
import { useSubscription } from '@/hooks/useSubscription';

const mockUseSubscription = useSubscription as jest.MockedFunction<typeof useSubscription>;

describe('PaywallScreen', () => {
  beforeEach(() => {
    mockUseSubscription.mockReturnValue({
      isPremium: false,
      purchase: jest.fn(),
      purchaseError: null,
      isLoadingProducts: false,
      monthlyPrice: '$4.99',
      yearlyPrice: '$29.99',
      lifetimePrice: '$49.99',
    });
  });

  it('renders the premium heading', () => {
    render(<PaywallScreen />);
    expect(screen.getByText('Unlock Barkly Premium')).toBeTruthy();
  });

  it('renders all three plan options with prices', () => {
    render(<PaywallScreen />);
    expect(screen.getByText('Annual')).toBeTruthy();
    expect(screen.getByText('Monthly')).toBeTruthy();
    expect(screen.getByText('Lifetime')).toBeTruthy();
    expect(screen.getByText('$29.99')).toBeTruthy();
    expect(screen.getByText('$4.99')).toBeTruthy();
    expect(screen.getByText('$49.99')).toBeTruthy();
  });

  it('shows Best Value badge on Annual plan', () => {
    render(<PaywallScreen />);
    expect(screen.getByText('Best Value')).toBeTruthy();
  });

  it('shows ActivityIndicator when products are loading', () => {
    mockUseSubscription.mockReturnValue({
      isPremium: false,
      purchase: jest.fn(),
      purchaseError: null,
      isLoadingProducts: true,
      monthlyPrice: undefined,
      yearlyPrice: undefined,
      lifetimePrice: undefined,
    });
    render(<PaywallScreen />);
    // Plans should not be shown while loading
    expect(screen.queryByText('Annual')).toBeNull();
  });

  it('renders feature list items', () => {
    render(<PaywallScreen />);
    expect(screen.getByText(/All tricks unlocked/)).toBeTruthy();
  });
});
