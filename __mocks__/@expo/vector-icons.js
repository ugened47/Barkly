// Mock for @expo/vector-icons — returns a simple Text element
// to avoid async font loading that triggers act() warnings.
const React = require("react");
const { Text } = require("react-native");

function createIconMock(displayName) {
  const Icon = (props) => React.createElement(Text, props, props.name || "");
  Icon.displayName = displayName || "Icon";
  return Icon;
}

const Ionicons = createIconMock("Ionicons");
const MaterialCommunityIcons = createIconMock("MaterialCommunityIcons");
const FontAwesome = createIconMock("FontAwesome");

// Named exports for: import { Ionicons } from '@expo/vector-icons'
module.exports = { Ionicons, MaterialCommunityIcons, FontAwesome };

// Default export for: import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
// When jest resolves a deep path like '@expo/vector-icons/MaterialCommunityIcons' to this file,
// the default export is used.
module.exports.default = createIconMock("Icon");
module.exports.__esModule = true;
