import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="trick/[id]"
          options={{ title: 'Trick Detail', headerBackTitle: 'Back' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
