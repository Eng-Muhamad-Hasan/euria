import { Stack } from "expo-router";

const RestaurantsLayout = () => {
  return (
    <Stack screenOptions={{contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" options={{ headerShown:false}} />
    </Stack>
  );
};

export default RestaurantsLayout;
