import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useAppStore } from '@/store/useAppStore';
import { act } from 'react';
import { router } from 'expo-router';

import LibraryScreen from '@/app/(tabs)/library';
import { getFreeTrickIds } from '@/utils/premium';
import { TRICKS_DATA } from '@/constants/TricksData';

const LOCKED_TRICK = TRICKS_DATA.find((t) => t.category === 'Advanced')!;
const FREE_TRICK_ID = getFreeTrickIds()[0];
const FREE_TRICK = TRICKS_DATA.find((t) => t.id === FREE_TRICK_ID)!;

describe('LibraryScreen — premium gating', () => {
  beforeEach(() => {
    act(() => {
      useAppStore.setState({ isPremium: false, masteredTricks: [] });
    });
    (router.push as jest.Mock).mockClear();
    (router.replace as jest.Mock).mockClear();
  });

  describe('free user', () => {
    it('shows the upsell banner', () => {
      render(<LibraryScreen />);
      expect(screen.getByTestId('upsell-banner')).toBeTruthy();
    });

    it('navigates to paywall when upsell banner is pressed', () => {
      render(<LibraryScreen />);
      fireEvent.press(screen.getByTestId('upsell-banner'));
      expect(router.push).toHaveBeenCalledWith('/paywall');
    });

    it('navigates to paywall when a locked trick is pressed', () => {
      render(<LibraryScreen />);
      const card = screen.getByText(LOCKED_TRICK.name);
      fireEvent.press(card);
      expect(router.push).toHaveBeenCalledWith('/paywall');
    });

    it('navigates to trick detail when a free trick is pressed', () => {
      render(<LibraryScreen />);
      const card = screen.getByText(FREE_TRICK.name);
      fireEvent.press(card);
      expect(router.push).toHaveBeenCalledWith(`/trick/${FREE_TRICK.id}`);
    });
  });

  describe('premium user', () => {
    beforeEach(() => {
      act(() => {
        useAppStore.setState({ isPremium: true });
      });
    });

    it('does not show the upsell banner', () => {
      render(<LibraryScreen />);
      expect(screen.queryByTestId('upsell-banner')).toBeNull();
    });

    it('navigates to trick detail for any trick', () => {
      render(<LibraryScreen />);
      const card = screen.getByText(LOCKED_TRICK.name);
      fireEvent.press(card);
      expect(router.push).toHaveBeenCalledWith(`/trick/${LOCKED_TRICK.id}`);
    });
  });
});
