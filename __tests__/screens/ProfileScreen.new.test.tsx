/**
 * New tests for the progress bar and sound toggle added to the Profile screen.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '@/app/(tabs)/profile';
import { useAppStore } from '@/store/useAppStore';
import { TRICKS_DATA } from '@/constants/TricksData';

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

describe('ProfileScreen — progress bar', () => {
  it('renders the progress bar track', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('progress-bar-track')).toBeTruthy();
  });

  it('shows 0% fill when no tricks are mastered', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '0%' });
  });

  it('shows 100% fill when all tricks are mastered', () => {
    useAppStore.setState({ masteredTricks: TRICKS_DATA.map((t) => t.id) });
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('progress-bar-fill').props.style).toMatchObject({ width: '100%' });
  });

  it('shows a proportional fill for partial mastery', () => {
    const half = TRICKS_DATA.slice(0, Math.floor(TRICKS_DATA.length / 2)).map((t) => t.id);
    useAppStore.setState({ masteredTricks: half });
    const { getByTestId } = render(<ProfileScreen />);
    const fill = getByTestId('progress-bar-fill');
    // The width should be a percentage string, not 0% and not 100%
    const widthStr: string = fill.props.style.width;
    expect(widthStr).toMatch(/%$/);
    const widthNum = parseFloat(widthStr);
    expect(widthNum).toBeGreaterThan(0);
    expect(widthNum).toBeLessThan(100);
  });
});

describe('ProfileScreen — sound toggle', () => {
  it('renders the sound label', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Click Sound')).toBeTruthy();
  });

  it('renders the sound toggle', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('sound-toggle')).toBeTruthy();
  });

  it('disables sound when toggle is pressed while sound is on', () => {
    useAppStore.setState({ soundEnabled: true });
    const { getByTestId } = render(<ProfileScreen />);
    fireEvent.press(getByTestId('sound-toggle'));
    expect(useAppStore.getState().soundEnabled).toBe(false);
  });

  it('enables sound when toggle is pressed while sound is off', () => {
    useAppStore.setState({ soundEnabled: false });
    const { getByTestId } = render(<ProfileScreen />);
    fireEvent.press(getByTestId('sound-toggle'));
    expect(useAppStore.getState().soundEnabled).toBe(true);
  });

  it('shows "On" label when sound is enabled', () => {
    useAppStore.setState({ soundEnabled: true });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('On')).toBeTruthy();
  });

  it('shows "Off" label when sound is disabled', () => {
    useAppStore.setState({ soundEnabled: false });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Off')).toBeTruthy();
  });
});
