import { ClickerButton } from "@/components/ClickerButton";
import { fireEvent, render } from "@testing-library/react-native";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import React from "react";

const mockPlayer = {
  play: jest.fn(),
  seekTo: jest.fn(),
  pause: jest.fn(),
  remove: jest.fn(),
};
(useAudioPlayer as jest.Mock).mockReturnValue(mockPlayer);

describe("ClickerButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAudioPlayer as jest.Mock).mockReturnValue(mockPlayer);
  });

  it("renders the CLICK label", () => {
    const { getByText } = render(<ClickerButton />);
    expect(getByText("CLICK")).toBeTruthy();
  });

  it("calls the onPress callback when tapped", () => {
    const onPress = jest.fn();
    const { getByText } = render(<ClickerButton onPress={onPress} />);
    fireEvent.press(getByText("CLICK"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("fires haptic feedback on each press", () => {
    const { getByText } = render(<ClickerButton />);
    fireEvent.press(getByText("CLICK"));
    expect(Haptics.impactAsync).toHaveBeenCalled();
  });

  it("fires haptic feedback on every press", () => {
    const { getByText } = render(<ClickerButton />);
    fireEvent.press(getByText("CLICK"));
    fireEvent.press(getByText("CLICK"));
    expect(Haptics.impactAsync).toHaveBeenCalledTimes(2);
  });

  it("does not play sound when soundEnabled is false", () => {
    const { getByText } = render(<ClickerButton soundEnabled={false} />);
    fireEvent.press(getByText("CLICK"));

    expect(mockPlayer.seekTo).not.toHaveBeenCalled();
    expect(mockPlayer.play).not.toHaveBeenCalled();
  });

  it("plays sound when soundEnabled is true (default)", () => {
    const { getByText } = render(<ClickerButton soundEnabled />);
    fireEvent.press(getByText("CLICK"));

    expect(mockPlayer.seekTo).toHaveBeenCalledWith(0);
    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
  });
});
