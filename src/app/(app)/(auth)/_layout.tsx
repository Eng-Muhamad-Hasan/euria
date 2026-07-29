import { Stack } from "expo-router";
// import {Stack } from '@/utils/stack'
// import Transition from 'react-native-screen-transitions'
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
          
          animation:'flip'
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
        // enableTransitions:true,
        // ...Transition.Presets.ElasticCard()
        }}
      />
    </Stack>
  );
}
