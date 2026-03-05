// Mock for expo-iap — prevents native IAP calls in tests

const mockUseIAP = jest.fn(() => ({
  connected: false,
  products: [],
  subscriptions: [],
  availablePurchases: [],
  activeSubscriptions: [],
  fetchProducts: jest.fn().mockResolvedValue(undefined),
  requestPurchase: jest.fn().mockResolvedValue(undefined),
  finishTransaction: jest.fn().mockResolvedValue(undefined),
  getAvailablePurchases: jest.fn().mockResolvedValue(undefined),
  getActiveSubscriptions: jest.fn().mockResolvedValue(undefined),
  hasActiveSubscriptions: jest.fn().mockResolvedValue(false),
  restorePurchases: jest.fn().mockResolvedValue(undefined),
  verifyPurchase: jest.fn().mockResolvedValue({ isValid: true }),
  verifyPurchaseWithProvider: jest.fn().mockResolvedValue({}),
  checkAlternativeBillingAvailabilityAndroid: jest.fn().mockResolvedValue(false),
  showAlternativeBillingDialogAndroid: jest.fn().mockResolvedValue(false),
  createAlternativeBillingTokenAndroid: jest.fn().mockResolvedValue(null),
}));

module.exports = {
  useIAP: mockUseIAP,
  initConnection: jest.fn().mockResolvedValue(true),
  endConnection: jest.fn().mockResolvedValue(undefined),
  fetchProducts: jest.fn().mockResolvedValue([]),
  getAvailablePurchases: jest.fn().mockResolvedValue([]),
  hasActiveSubscriptions: jest.fn().mockResolvedValue(false),
  requestPurchase: jest.fn().mockResolvedValue(undefined),
  finishTransaction: jest.fn().mockResolvedValue(undefined),
  purchaseUpdatedListener: jest.fn(() => ({ remove: jest.fn() })),
  purchaseErrorListener: jest.fn(() => ({ remove: jest.fn() })),
};
