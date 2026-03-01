/**
 * New tests for the "Practiced Today" feature added to the Trick Detail screen.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrickDetailScreen from '@/app/trick/[id]';
import { useAppStore } from '@/store/useAppStore';
import { useLocalSearchParams } from 'expo-router';

const mockUseLocalSearchParams = useLocalSearchParams as jest.Mock;

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
  mockUseLocalSearchParams.mockReturnValue({ id: 'sit' });
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-03-01T10:00:00.000Z'));
});

afterEach(() => {
  jest.useRealTimers();
});

describe('TrickDetailScreen — practiced today', () => {
  it('renders the "Practiced Today" button', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Practiced Today')).toBeTruthy();
  });

  it('records the practice and starts the streak when pressed', () => {
    const { getByText } = render(<TrickDetailScreen />);
    fireEvent.press(getByText('Practiced Today'));
    expect(useAppStore.getState().practicedToday).toContain('sit');
    expect(useAppStore.getState().streak).toBe(1);
  });

  it('shows "Practiced ✓" when the trick is already in practicedToday', () => {
    useAppStore.setState({ practicedToday: ['sit'] });
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Practiced ✓')).toBeTruthy();
  });

  it('hides "Practiced Today" button when already practiced', () => {
    useAppStore.setState({ practicedToday: ['sit'] });
    const { queryByText } = render(<TrickDetailScreen />);
    expect(queryByText('Practiced Today')).toBeNull();
  });

  it('does not interfere with the "Mark as Mastered" button', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Mark as Mastered')).toBeTruthy();
    expect(getByText('Practiced Today')).toBeTruthy();
  });

  it('practiced today and mastered can coexist independently', () => {
    useAppStore.setState({ practicedToday: ['sit'], masteredTricks: [] });
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Practiced ✓')).toBeTruthy();
    expect(getByText('Mark as Mastered')).toBeTruthy();
  });
});
