import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '@/app/(tabs)/profile';
import { useAppStore } from '@/store/useAppStore';
import { TRICKS_DATA } from '@/constants/TricksData';

beforeEach(() => {
  useAppStore.setState({
    streak: 0,
    masteredTricks: [],
    dogProfile: { name: '', breed: '' },
  });
});

describe('ProfileScreen', () => {
  it('renders the Profile heading', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Profile')).toBeTruthy();
  });

  it('renders the "Your Dog" section', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Your Dog')).toBeTruthy();
  });

  it('renders name and breed input fields', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    expect(getByPlaceholderText('e.g. Buddy')).toBeTruthy();
    expect(getByPlaceholderText('e.g. Golden Retriever')).toBeTruthy();
  });

  it('displays pre-filled values from the store', () => {
    useAppStore.setState({ dogProfile: { name: 'Max', breed: 'Labrador' } });
    const { getByDisplayValue } = render(<ProfileScreen />);
    expect(getByDisplayValue('Max')).toBeTruthy();
    expect(getByDisplayValue('Labrador')).toBeTruthy();
  });

  it('updates the store when the name field changes', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Buddy'), 'Luna');
    expect(useAppStore.getState().dogProfile.name).toBe('Luna');
  });

  it('updates the store when the breed field changes', () => {
    const { getByPlaceholderText } = render(<ProfileScreen />);
    fireEvent.changeText(getByPlaceholderText('e.g. Golden Retriever'), 'Poodle');
    expect(useAppStore.getState().dogProfile.breed).toBe('Poodle');
  });

  it('shows the mastered tricks count header', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Mastered Tricks')).toBeTruthy();
  });

  it('shows the mastered count fraction', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText(`0 / ${TRICKS_DATA.length}`)).toBeTruthy();
  });

  it('shows the empty-state message when no tricks are mastered', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('No tricks mastered yet')).toBeTruthy();
  });

  it('hides the empty-state message when tricks are mastered', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { queryByText } = render(<ProfileScreen />);
    expect(queryByText('No tricks mastered yet')).toBeNull();
  });

  it('lists mastered trick names', () => {
    useAppStore.setState({ masteredTricks: ['sit', 'shake'] });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Sit')).toBeTruthy();
    expect(getByText('Shake Paws')).toBeTruthy();
  });

  it('shows the correct mastered count fraction', () => {
    useAppStore.setState({ masteredTricks: ['sit', 'stay', 'come'] });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText(`3 / ${TRICKS_DATA.length}`)).toBeTruthy();
  });

  it('shows trick category alongside each mastered trick', () => {
    useAppStore.setState({ masteredTricks: ['sit'] });
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Basic Obedience')).toBeTruthy();
  });
});
