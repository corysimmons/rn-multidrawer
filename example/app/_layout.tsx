import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import '../global.css';

console.log('[TAILWIND DEBUG] _layout.tsx loaded, global.css imported');

export default function RootLayout() {
  console.log('[TAILWIND DEBUG] RootLayout rendering');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="layouts/[layout]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
