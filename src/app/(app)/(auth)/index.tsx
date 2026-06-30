import useUserStore from "@/hooks/use-userstore";
import { Button, StyleSheet, Text, View } from "react-native";

export default function index() {
  const { setIsGuest } = useUserStore();
  return (
    <View style={styles.container}>
      <Text>This is entry feed</Text>
      <Button
        title="Go Login"
        onPress={() => {
          setIsGuest(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
