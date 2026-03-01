import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ClickerScreen from '@/app/(tabs)/clicker';
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

describe('ClickerScreen', () => {
  it('renders the Clicker heading', () => {
    const { getByText } = render(<ClickerScreen />);
    expect(getByText('Clicker')).toBeTruthy();
  });

  it('shows the session click count starting at 0', () => {
    const { getByText } = render(<ClickerScreen />);
    expect(getByText('0')).toBeTruthy();
  });

  it('shows the CLICK button', () => {
    const { getByText } = render(<ClickerScreen />);
    expect(getByText('CLICK')).toBeTruthy();
  });

  it('increments the session click count when the button is pressed', () => {
    const { getByText } = render(<ClickerScreen />);
    fireEvent.press(getByText('CLICK'));
    expect(useAppStore.getState().sessionClicks).toBe(1);
  });

  it('displays a pre-existing session count from the store', () => {
    useAppStore.setState({ sessionClicks: 7 });
    const { getByText } = render(<ClickerScreen />);
    expect(getByText('7')).toBeTruthy();
  });

  it('shows a label for the session count', () => {
    const { getByText } = render(<ClickerScreen />);
    expect(getByText(/session/i)).toBeTruthy();
  });
});
