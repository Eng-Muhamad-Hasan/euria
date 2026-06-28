import { Colors, Fonts } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

export default function GoogleAuthButton() {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.googleButton}>
      <Ionicons name="logo-google" size={18} color="white" />
      <Text style={styles.googleButtonText}>Continue With Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: Colors.accentBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    gap: 5,
    
  },
  googleButtonText: {
    fontSize: 18,
    fontFamily: Fonts.brandSemiBold,
    color: Colors.primaryLight,
  },
});
