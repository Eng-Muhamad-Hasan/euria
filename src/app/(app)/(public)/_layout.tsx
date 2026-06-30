import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      />
      <Stack.Screen
        name="other-options"
        
        options={{
          headerShown: false,
          presentation: "modal",
          animation:'slide_from_bottom',
          title: "Other Options",
          sheetAllowedDetents: [0.5,0.8],
          contentStyle: { backgroundColor: "#fff" },
sheetCornerRadius:16,
          headerShadowVisible: false,
        }}
      />

    </Stack>
  );
}
