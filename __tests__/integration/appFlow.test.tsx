/**
 * Cross-screen app-flow integration tests
 *
 * The Zustand store is the single source of truth shared by every screen.
 * These tests exercise multi-step user flows where an action in one screen
 * (e.g. TrickDetailScreen marking a trick as mastered) must be reflected
 * in a different screen (HomeScreen recommendations, LibraryScreen badges,
 * ProfileScreen list) — without any intermediate navigation mocking or
 * store resets between renders within the same test.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import HomeScreen from '@/app/(tabs)/index';
import LibraryScreen from '@/app/(tabs)/library';
import TrickDetailScreen from '@/app/trick/[id]';
import ProfileScreen from '@/app/(tabs)/profile';
import { TRICKS_DATA } from '@/constants/TricksData';

const mockParams = useLocalSearchParams as jest.Mock;

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

// ---------------------------------------------------------------------------
// Trick mastery flow
// ---------------------------------------------------------------------------

describe('Trick mastery — HomeScreen', () => {
  it('mastering a trick removes it from the recommendations list', () => {
    // Confirm 'Sit' is recommended before mastering
    expect(render(<HomeScreen />).getByText('Sit')).toBeTruthy();

    // User opens TrickDetailScreen and marks Sit as mastered
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    // HomeScreen must no longer recommend Sit
    expect(render(<HomeScreen />).queryByText('Sit')).toBeNull();
  });

  it('mastering all tricks shows "All tricks mastered!" on HomeScreen', () => {
    useAppStore.setState({ masteredTricks: TRICKS_DATA.map((t) => t.id) });
    const { getByText } = render(<HomeScreen />);
    expect(getByText('All tricks mastered!')).toBeTruthy();
  });

  it('unmastering a trick brings it back into recommendations', () => {
    // Master then unmaster 'sit'
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mastered ✓'));

    // 'Sit' should reappear in HomeScreen recommendations
    expect(render(<HomeScreen />).getByText('Sit')).toBeTruthy();
  });
});

describe('Trick mastery — LibraryScreen', () => {
  it('mastered trick shows a checkmark badge in the library', () => {
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    const { getAllByText } = render(<LibraryScreen />);
    expect(getAllByText('✓').length).toBeGreaterThan(0);
  });

  it('mastered count increments correctly in LibraryScreen', () => {
    expect(
      render(<LibraryScreen />).getByText(`0 of ${TRICKS_DATA.length} tricks mastered`),
    ).toBeTruthy();

    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    expect(
      render(<LibraryScreen />).getByText(`1 of ${TRICKS_DATA.length} tricks mastered`),
    ).toBeTruthy();
  });

  it('mastering multiple tricks updates the library count', () => {
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));
    mockParams.mockReturnValue({ id: 'stay' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    expect(
      render(<LibraryScreen />).getByText(`2 of ${TRICKS_DATA.length} tricks mastered`),
    ).toBeTruthy();
  });
});

describe('Trick mastery — ProfileScreen', () => {
  it('mastered trick name appears in the ProfileScreen list', () => {
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    expect(render(<ProfileScreen />).getByText('Sit')).toBeTruthy();
  });

  it('multiple mastered tricks all appear in ProfileScreen', () => {
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));
    mockParams.mockReturnValue({ id: 'shake' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Sit')).toBeTruthy();
    expect(getByText('Shake Paws')).toBeTruthy();
  });

  it('unmastering a trick removes it from the ProfileScreen list', () => {
    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mastered ✓'));

    expect(render(<ProfileScreen />).getByText('No tricks mastered yet')).toBeTruthy();
  });

  it('ProfileScreen fraction stays in sync across mastering actions', () => {
    expect(
      render(<ProfileScreen />).getByText(`0 / ${TRICKS_DATA.length}`),
    ).toBeTruthy();

    mockParams.mockReturnValue({ id: 'sit' });
    fireEvent.press(render(<TrickDetailScreen />).getByText('Mark as Mastered'));

    expect(
      render(<ProfileScreen />).getByText(`1 / ${TRICKS_DATA.length}`),
    ).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Streak display
// ---------------------------------------------------------------------------

describe('Streak display', () => {
  it('HomeScreen reflects a streak of 0 by default', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('0')).toBeTruthy();
    expect(getByText('days')).toBeTruthy();
  });

  it('HomeScreen shows the updated streak after incrementing', () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    const { getByText } = render(<HomeScreen />);
    expect(getByText('2')).toBeTruthy();
  });

  it('uses singular "day" when streak is exactly 1', () => {
    useAppStore.getState().incrementStreak();
    const { getByText } = render(<HomeScreen />);
    expect(getByText('day')).toBeTruthy();
  });

  it('uses plural "days" when streak is greater than 1', () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    const { getByText } = render(<HomeScreen />);
    expect(getByText('days')).toBeTruthy();
  });

  it('streak resets to 0 and HomeScreen reflects the reset', () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    useAppStore.getState().resetStreak();
    const { getByText } = render(<HomeScreen />);
    expect(getByText('0')).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Dog profile input sync
// ---------------------------------------------------------------------------

describe('Dog profile input sync', () => {
  it('typing a name updates the Zustand store', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Buddy'), 'Max');
    expect(useAppStore.getState().dogProfile.name).toBe('Max');
  });

  it('typing a breed updates the Zustand store', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Golden Retriever'), 'Labrador');
    expect(useAppStore.getState().dogProfile.breed).toBe('Labrador');
  });

  it('saved profile is pre-filled on subsequent renders', () => {
    useAppStore.setState({ dogProfile: { name: 'Buddy', breed: 'Poodle' } });
    const { getByDisplayValue } = render(<ProfileScreen />);
    expect(getByDisplayValue('Buddy')).toBeTruthy();
    expect(getByDisplayValue('Poodle')).toBeTruthy();
  });

  it('name entered in one render is visible in the next render', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Buddy'), 'Rex');

    const { getByDisplayValue } = render(<ProfileScreen />);
    expect(getByDisplayValue('Rex')).toBeTruthy();
  });

  it('partial update preserves the other field across renders', () => {
    useAppStore.setState({ dogProfile: { name: 'Buddy', breed: 'Poodle' } });
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Buddy'), 'Max');

    const { getByDisplayValue } = render(<ProfileScreen />);
    expect(getByDisplayValue('Max')).toBeTruthy();
    expect(getByDisplayValue('Poodle')).toBeTruthy();
  });
});
