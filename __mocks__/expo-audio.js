// Mock for expo-audio — prevents actual audio loading in tests
const mockPlayer = {
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(),
  remove: jest.fn(),
};

module.exports = {
  useAudioPlayer: jest.fn(() => mockPlayer),
  Audio: {
    createAudioPlayer: jest.fn(() => mockPlayer),
    setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
  },
};
