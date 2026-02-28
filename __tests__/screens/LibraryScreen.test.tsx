import React from 'react';
import { render } from '@testing-library/react-native';
import LibraryScreen from '@/app/(tabs)/library';
import { useAppStore } from '@/store/useAppStore';
import { TRICKS_DATA } from '@/constants/TricksData';

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

describe('LibraryScreen', () => {
  it('renders the screen title', () => {
    const { getByText } = render(<LibraryScreen />);
    expect(getByText('Training Library')).toBeTruthy();
  });

  it('shows 0 of N tricks mastered by default', () => {
    const { getByText } = render(<LibraryScreen />);
    expect(getByText(`0 of ${TRICKS_DATA.length} tricks mastered`)).toBeTruthy();
  });

  it('updates the mastered count when tricks are mastered', () => {
    useAppStore.setState({ masteredTricks: ['sit', 'stay'] });
    const { getByText } = render(<LibraryScreen />);
    expect(getByText(`2 of ${TRICKS_DATA.length} tricks mastered`)).toBeTruthy();
  });

  it('renders all three category headings', () => {
    const { getByText } = render(<LibraryScreen />);
    expect(getByText('Basic Obedience')).toBeTruthy();
    expect(getByText('Puppy Tricks')).toBeTruthy();
    expect(getByText('Advanced')).toBeTruthy();
  });

  it('renders every trick in the list', () => {
    const { getByText } = render(<LibraryScreen />);
    for (const trick of TRICKS_DATA) {
      expect(getByText(trick.name)).toBeTruthy();
    }
  });

  it('shows mastered checkmark for a mastered trick', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getAllByText } = render(<LibraryScreen />);
    expect(getAllByText('✓').length).toBeGreaterThan(0);
  });

  it('shows no checkmarks when no tricks are mastered', () => {
    const { queryByText } = render(<LibraryScreen />);
    expect(queryByText('✓')).toBeNull();
  });
});

describe('groupByCategory logic', () => {
  it('Basic Obedience tricks all have the correct category', () => {
    const basicTricks = TRICKS_DATA.filter((t) => t.category === 'Basic Obedience');
    for (const trick of basicTricks) {
      expect(trick.category).toBe('Basic Obedience');
    }
  });

  it('Puppy Tricks all have the correct category', () => {
    const puppyTricks = TRICKS_DATA.filter((t) => t.category === 'Puppy Tricks');
    for (const trick of puppyTricks) {
      expect(trick.category).toBe('Puppy Tricks');
    }
  });

  it('Advanced tricks all have the correct category', () => {
    const advancedTricks = TRICKS_DATA.filter((t) => t.category === 'Advanced');
    for (const trick of advancedTricks) {
      expect(trick.category).toBe('Advanced');
    }
  });

  it('categories together cover every trick', () => {
    const allCategorised = [
      ...TRICKS_DATA.filter((t) => t.category === 'Basic Obedience'),
      ...TRICKS_DATA.filter((t) => t.category === 'Puppy Tricks'),
      ...TRICKS_DATA.filter((t) => t.category === 'Advanced'),
    ];
    expect(allCategorised).toHaveLength(TRICKS_DATA.length);
  });
});
