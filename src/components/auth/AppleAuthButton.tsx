import { Colors, Fonts } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Ionicons } from "@react-native-vector-icons/ionicons";

export default function AppleAuthButton() {
  return (
    <TouchableOpacity style={styles.appleButton}>
      <Ionicons name="logo-apple" size={18} color="white" />
      <Text style={styles.appleButtonText}>SignIn With Apple</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    backgroundColor: Colors.ultraDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 5,
  },
  appleButtonText: {
    fontSize: 18,
    fontFamily: Fonts.brandSemiBold,
    color: Colors.primaryLight,
  },
});
