import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ClickerButton } from '@/components/ClickerButton';
import * as Haptics from 'expo-haptics';

describe('ClickerButton', () => {
  it('renders the CLICK label', () => {
    const { getByText } = render(<ClickerButton />);
    expect(getByText('CLICK')).toBeTruthy();
  });

  it('calls the onPress callback when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<ClickerButton onPress={onPress} />);
    fireEvent.press(getByText('CLICK'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('fires haptic feedback on each press', () => {
    const { getByText } = render(<ClickerButton />);
    fireEvent.press(getByText('CLICK'));
    expect(Haptics.impactAsync).toHaveBeenCalled();
  });

  it('fires haptic feedback on every press', () => {
    const { getByText } = render(<ClickerButton />);
    fireEvent.press(getByText('CLICK'));
    fireEvent.press(getByText('CLICK'));
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(2);
  });

  it('does not call replayAsync when soundEnabled is false', async () => {
    const mockSound = {
      replayAsync: jest.fn().mockResolvedValue(undefined),
      unloadAsync: jest.fn().mockResolvedValue(undefined),
    };
    const { Audio } = require('expo-av');
    Audio.Sound.createAsync.mockResolvedValueOnce({ sound: mockSound });

    const { getByText } = render(<ClickerButton soundEnabled={false} />);
    // Wait for the async sound load
    await new Promise((r) => setTimeout(r, 0));
    fireEvent.press(getByText('CLICK'));

    expect(mockSound.replayAsync).not.toHaveBeenCalled();
  });

  it('calls replayAsync when soundEnabled is true (default)', async () => {
    const mockSound = {
      replayAsync: jest.fn().mockResolvedValue(undefined),
      unloadAsync: jest.fn().mockResolvedValue(undefined),
    };
    const { Audio } = require('expo-av');
    Audio.Sound.createAsync.mockResolvedValueOnce({ sound: mockSound });

    const { getByText } = render(<ClickerButton soundEnabled />);
    await new Promise((r) => setTimeout(r, 0));
    fireEvent.press(getByText('CLICK'));

    expect(mockSound.replayAsync).toHaveBeenCalledTimes(1);
  });
});
