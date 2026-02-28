// Mock for expo-router — provides controllable navigation stubs
module.exports = {
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn().mockReturnValue(true),
  },
  useLocalSearchParams: jest.fn().mockReturnValue({}),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Link: 'Link',
  Stack: { Screen: 'StackScreen' },
  Tabs: { Screen: 'TabsScreen' },
};
