/**
 * Mock for react-native-css (NativeWind v5 runtime).
 * useCssElement normally converts className → style. In tests we just
 * render the underlying React Native component with all non-className props.
 */
const React = require('react');

module.exports = {
  useCssElement(Component, props) {
    const { className, contentContainerClassName, ...rest } = props || {};
    return React.createElement(Component, rest);
  },
};
