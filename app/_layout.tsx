import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";

// Silence Reanimated strict-mode warnings triggered by internal libraries
// (react-native-screens / expo-router), not by our code.
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="trick/[id]"
          options={{ title: "Trick Detail", headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="paywall"
          options={{ presentation: "modal", title: "Go Premium" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
