import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrickDetailScreen from '@/app/trick/[id]';
import { useAppStore } from '@/store/useAppStore';
import { useLocalSearchParams } from 'expo-router';
import { TRICKS_DATA } from '@/constants/TricksData';

const mockUseLocalSearchParams = useLocalSearchParams as jest.Mock;

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
  mockUseLocalSearchParams.mockReturnValue({ id: 'sit' });
});

describe('TrickDetailScreen', () => {
  it('renders the trick name', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Sit')).toBeTruthy();
  });

  it('renders the trick category', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Basic Obedience')).toBeTruthy();
  });

  it('renders the difficulty badge', () => {
    const { getAllByText } = render(<TrickDetailScreen />);
    expect(getAllByText('Easy').length).toBeGreaterThan(0);
  });

  it('renders the Steps heading', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Steps')).toBeTruthy();
  });

  it('renders step numbers', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('1')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
  });

  it('shows "Mark as Mastered" button when not mastered', () => {
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Mark as Mastered')).toBeTruthy();
  });

  it('shows "Mastered ✓" when the trick is already mastered', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Mastered ✓')).toBeTruthy();
  });

  it('marks trick as mastered when button is pressed', () => {
    const { getByText } = render(<TrickDetailScreen />);
    fireEvent.press(getByText('Mark as Mastered'));
    expect(useAppStore.getState().masteredTricks).toContain('sit');
  });

  it('unmarks trick when "Mastered ✓" is pressed', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getByText } = render(<TrickDetailScreen />);
    fireEvent.press(getByText('Mastered ✓'));
    expect(useAppStore.getState().masteredTricks).not.toContain('sit');
  });

  it('shows not-found message for an unknown trick id', () => {
    mockUseLocalSearchParams.mockReturnValue({ id: 'nonexistent-trick' });
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Trick not found.')).toBeTruthy();
  });

  it('renders a trick from the Puppy Tricks category', () => {
    mockUseLocalSearchParams.mockReturnValue({ id: 'shake' });
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText('Shake Paws')).toBeTruthy();
    expect(getByText('Puppy Tricks')).toBeTruthy();
  });

  it('renders a Hard Advanced trick', () => {
    mockUseLocalSearchParams.mockReturnValue({ id: 'play-dead' });
    const { getByText, getAllByText } = render(<TrickDetailScreen />);
    expect(getByText('Play Dead')).toBeTruthy();
    expect(getAllByText('Hard').length).toBeGreaterThan(0);
  });

  it('renders step text for the sit trick', () => {
    const sitTrick = TRICKS_DATA.find((t) => t.id === 'sit')!;
    const { getByText } = render(<TrickDetailScreen />);
    expect(getByText(sitTrick.steps[0])).toBeTruthy();
  });
});
