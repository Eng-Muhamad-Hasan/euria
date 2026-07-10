
import { Stack } from "expo-router";
// import Transition from "react-native-screen-transitions";
const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerLargeTitleEnabled: true,
          headerTransparent: true,
        }}
      />
    </Stack>
    
  );
};

export default ProfileLayout;
