import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{contentStyle:{backgroundColor:'#fff'}}}>
      <Stack.Screen name="index" options={{title:'Profile',headerLargeTitleEnabled:true,headerTransparent:true }} />
    </Stack>
  );
};

export default ProfileLayout;
