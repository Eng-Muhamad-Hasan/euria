import { Colors, Fonts } from "@/constants/theme";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import AppleAuthButton from "@/components/auth/AppleAuthButton";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Image } from "expo-image";

function openWebPage() {
  Linking.openURL("#");
}

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.infinitScrollContainer}></View>
      <View style={styles.contentContainer}>
        <Image
          source={require("@/assets/images/wolt-logo.png")}
          style={styles.brandLogo}
        />
        <Animated.Text entering={FadeInDown} style={styles.title}>
          Best Choice Forever
        </Animated.Text>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <AppleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <GoogleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <TouchableOpacity style={styles.textButton}>
              <Text>Other Button</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View
          style={styles.privacyContainer}
          entering={FadeInDown.delay(400)}
        >
          <Text style={styles.privacyText}>Please Visit</Text>{" "}
          <Text style={styles.privacyLink} onPress={openWebPage}>
            Euria Privacy Statement
          </Text>{" "}
          <Text style={styles.privacyText}>
            to learn about your personal data processing at Euria.
          </Text>{" "}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infinitScrollContainer: {
    flex: 0.8,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  brandLogo: {
    height: 48,
    width: "100%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 50,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  textButton: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 5,
  },
  textButtonContent: {
    color: Colors.muted,
    fontSize: 18,
    fontFamily: Fonts.brandSemiBold,
  },

  privacyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: Colors.gray,

    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: Colors.accentBlue,
    textDecorationLine: "underline",
  },
});
