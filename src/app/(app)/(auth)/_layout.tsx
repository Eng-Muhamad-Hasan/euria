import { Stack } from "expo-router";
export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="(modal)/map"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      /> */}
      <Stack.Screen
        name="(modal)/(restaurant-details)/[id]"
        options={{
          headerShown: false,
          // ...Transition.Presets.DraggableCard()
        }}
      />
      <Stack.Screen
        name="(modal)/(menu)/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
