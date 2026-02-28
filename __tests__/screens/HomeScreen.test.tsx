import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';
import { useAppStore } from '@/store/useAppStore';
import { TRICKS_DATA } from '@/constants/TricksData';

const ALL_TRICK_IDS = TRICKS_DATA.map((t) => t.id);

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

describe('HomeScreen', () => {
  it('renders the greeting', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Good morning!')).toBeTruthy();
  });

  it('renders the Training Streak section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Training Streak')).toBeTruthy();
  });

  it('renders the Practice Today section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Practice Today')).toBeTruthy();
  });

  describe('streak display', () => {
    it('shows 0 streak by default', () => {
      const { getByText } = render(<HomeScreen />);
      expect(getByText('0')).toBeTruthy();
    });

    it('shows current streak value', () => {
      useAppStore.setState({ streak: 7 });
      const { getByText } = render(<HomeScreen />);
      expect(getByText('7')).toBeTruthy();
    });

    it('shows "day" (singular) for a streak of 1', () => {
      useAppStore.setState({ streak: 1 });
      const { getByText } = render(<HomeScreen />);
      expect(getByText('day')).toBeTruthy();
    });

    it('shows "days" (plural) for a streak of 2 or more', () => {
      useAppStore.setState({ streak: 5 });
      const { getByText } = render(<HomeScreen />);
      expect(getByText('days')).toBeTruthy();
    });

    it('shows "days" for a streak of 0', () => {
      const { getByText } = render(<HomeScreen />);
      expect(getByText('days')).toBeTruthy();
    });
  });

  describe('recommended tricks', () => {
    it('shows up to 3 unmastered tricks', () => {
      const { getByText } = render(<HomeScreen />);
      // With no mastered tricks the first 3 should appear
      expect(getByText(TRICKS_DATA[0].name)).toBeTruthy();
      expect(getByText(TRICKS_DATA[1].name)).toBeTruthy();
      expect(getByText(TRICKS_DATA[2].name)).toBeTruthy();
    });

    it('excludes tricks the user has already mastered', () => {
      useAppStore.setState({ masteredTricks: [TRICKS_DATA[0].id] });
      const { queryByText } = render(<HomeScreen />);
      expect(queryByText(TRICKS_DATA[0].name)).toBeNull();
    });

    it('shows "All tricks mastered!" when every trick is mastered', () => {
      useAppStore.setState({ masteredTricks: ALL_TRICK_IDS });
      const { getByText } = render(<HomeScreen />);
      expect(getByText('All tricks mastered!')).toBeTruthy();
    });

    it('hides recommended list when all tricks mastered', () => {
      useAppStore.setState({ masteredTricks: ALL_TRICK_IDS });
      const { queryByText } = render(<HomeScreen />);
      // None of the trick names should appear
      expect(queryByText(TRICKS_DATA[0].name)).toBeNull();
    });
  });
});
