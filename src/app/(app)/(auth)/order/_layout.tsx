import { Stack } from "expo-router";

const OrderLayout = () => {
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
        name="checkout"
        options={{
          title: "",
          contentStyle: { backgroundColor: "#fff" },
        }}
      />
    </Stack>
  );
};

export default OrderLayout;
