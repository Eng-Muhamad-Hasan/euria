import { Slot, Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack >
    <Stack.Screen name="(tabs)" options={{title:'Feed back'}} />
  </Stack>
}
