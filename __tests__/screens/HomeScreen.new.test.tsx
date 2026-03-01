/**
 * New tests for the onboarding card added to the Home screen.
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';
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
});

describe('HomeScreen — onboarding', () => {
  it('shows an onboarding card when the dog profile name is empty', () => {
    useAppStore.setState({ dogProfile: { name: '', breed: '' } });
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/set up your dog/i)).toBeTruthy();
  });

  it('hides the onboarding card when the dog profile has a name', () => {
    useAppStore.setState({ dogProfile: { name: 'Buddy', breed: 'Lab' } });
    const { queryByText } = render(<HomeScreen />);
    expect(queryByText(/set up your dog/i)).toBeNull();
  });

  it('renders the greeting regardless of profile state', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Good morning!')).toBeTruthy();
  });

  it('renders a link-like call to action in the onboarding card', () => {
    useAppStore.setState({ dogProfile: { name: '', breed: '' } });
    const { getAllByText } = render(<HomeScreen />);
    expect(getAllByText(/profile/i).length).toBeGreaterThan(0);
  });
});
