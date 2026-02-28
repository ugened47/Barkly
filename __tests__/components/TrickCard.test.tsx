import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TrickCard } from '@/components/TrickCard';
import type { Trick } from '@/constants/TricksData';

const baseTrick: Trick = {
  id: 'sit',
  name: 'Sit',
  category: 'Basic Obedience',
  difficulty: 'Easy',
  steps: ['Hold a treat', 'Move hand up', 'Say "Sit"', 'Reward'],
};

describe('TrickCard', () => {
  it('renders the trick name', () => {
    const { getByText } = render(
      <TrickCard trick={baseTrick} mastered={false} onPress={() => {}} />,
    );
    expect(getByText('Sit')).toBeTruthy();
  });

  it('displays the step count', () => {
    const { getByText } = render(
      <TrickCard trick={baseTrick} mastered={false} onPress={() => {}} />,
    );
    expect(getByText('4 steps')).toBeTruthy();
  });

  it('displays the difficulty badge', () => {
    const { getAllByText } = render(
      <TrickCard trick={baseTrick} mastered={false} onPress={() => {}} />,
    );
    // Difficulty text appears in both badge text nodes
    expect(getAllByText('Easy').length).toBeGreaterThan(0);
  });

  it('shows the mastered checkmark when mastered=true', () => {
    const { getByText } = render(
      <TrickCard trick={baseTrick} mastered={true} onPress={() => {}} />,
    );
    expect(getByText('✓')).toBeTruthy();
  });

  it('hides the checkmark when mastered=false', () => {
    const { queryByText } = render(
      <TrickCard trick={baseTrick} mastered={false} onPress={() => {}} />,
    );
    expect(queryByText('✓')).toBeNull();
  });

  it('calls onPress when the card is pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TrickCard trick={baseTrick} mastered={false} onPress={onPress} />,
    );
    fireEvent.press(getByText('Sit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a Medium difficulty trick', () => {
    const trick: Trick = { ...baseTrick, id: 'stay', name: 'Stay', difficulty: 'Medium' };
    const { getAllByText } = render(
      <TrickCard trick={trick} mastered={false} onPress={() => {}} />,
    );
    expect(getAllByText('Medium').length).toBeGreaterThan(0);
  });

  it('renders a Hard difficulty trick', () => {
    const trick: Trick = { ...baseTrick, id: 'leave-it', name: 'Leave It', difficulty: 'Hard' };
    const { getAllByText } = render(
      <TrickCard trick={trick} mastered={false} onPress={() => {}} />,
    );
    expect(getAllByText('Hard').length).toBeGreaterThan(0);
  });

  it('renders correct step count for a single-step trick', () => {
    const trick: Trick = { ...baseTrick, steps: ['Just one step'] };
    const { getByText } = render(
      <TrickCard trick={trick} mastered={false} onPress={() => {}} />,
    );
    expect(getByText('1 steps')).toBeTruthy();
  });
});
