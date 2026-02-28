/**
 * Navigation integration tests
 *
 * Verify that pressing a TrickCard in any screen calls router.push with
 * the exact URL for that trick. These tests cross the boundary between
 * the screen component, TrickCard, and the expo-router mock.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/store/useAppStore';
import HomeScreen from '@/app/(tabs)/index';
import LibraryScreen from '@/app/(tabs)/library';

const mockPush = router.push as jest.Mock;

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

describe('HomeScreen — navigation', () => {
  it('pressing the first recommended trick navigates to /trick/sit', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Sit'));
    expect(mockPush).toHaveBeenCalledWith('/trick/sit');
  });

  it('pressing the second recommended trick navigates to /trick/stay', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Stay'));
    expect(mockPush).toHaveBeenCalledWith('/trick/stay');
  });

  it('pressing a card triggers exactly one navigation call', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Sit'));
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('when first trick is mastered the next unmastered trick is recommended', () => {
    // 'sit' mastered — HomeScreen should now recommend 'stay' as first card
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Stay'));
    expect(mockPush).toHaveBeenCalledWith('/trick/stay');
  });
});

describe('LibraryScreen — navigation', () => {
  it('pressing a Basic Obedience trick navigates to it', () => {
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Sit'));
    expect(mockPush).toHaveBeenCalledWith('/trick/sit');
  });

  it('pressing a Puppy Trick navigates to it', () => {
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Shake Paws'));
    expect(mockPush).toHaveBeenCalledWith('/trick/shake');
  });

  it('pressing an Advanced trick navigates to it', () => {
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Play Dead'));
    expect(mockPush).toHaveBeenCalledWith('/trick/play-dead');
  });

  it('pressing a trick with a hyphenated id navigates correctly', () => {
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Leave It'));
    expect(mockPush).toHaveBeenCalledWith('/trick/leave-it');
  });

  it('pressing a card triggers exactly one navigation call', () => {
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Weave Through Legs'));
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('mastered tricks are still pressable and navigate correctly', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getByText } = render(<LibraryScreen />);
    fireEvent.press(getByText('Sit'));
    expect(mockPush).toHaveBeenCalledWith('/trick/sit');
  });
});
