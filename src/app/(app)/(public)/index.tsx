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
import InfiniteScrollSlide from "@/components/auth/InfiniteScrollSlide";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
function openWebPage() {
  Linking.openURL("https://wolt.com/privacy");
}

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.infinitScrollContainer}>
        <View>
          <InfiniteScrollSlide scrollDirection="down" iconSet="set1" />
        </View>
        <View>
          <InfiniteScrollSlide scrollDirection="up" iconSet="set2" />
        </View>
        <View>
          <InfiniteScrollSlide scrollDirection="down" iconSet="set3" />
        </View>
        <LinearGradient
          colors={["transparent", "#fff"]}
          style={styles.gradientStyle}
        />
      </View>
      <View style={styles.contentContainer}>
        <Image
          contentFit="contain"
          contentPosition={"center"}
          source={require("@/assets/images/wolt-logo.png")}
          style={styles.brandLogo}
        />
        <Animated.Text entering={FadeInDown} style={styles.title}>
          Your Best Choice Forever
        </Animated.Text>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <AppleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <GoogleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <TouchableOpacity activeOpacity={0.8} style={styles.textButton}>
              <Text style={styles.textButtonContent}>Other Options</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View
          style={styles.privacyContainer}
          entering={FadeInDown.delay(400)}
        >
          <Text style={styles.privacyText}>Please Visit</Text>
          <Text
            style={styles.privacyLink}
            onPress={openWebPage}
            accessibilityRole="link"
            accessibilityHint="Open Privacy on browser"
          >
            Euria Privacy Statement
          </Text>
          <Text style={styles.privacyText}>
            to learn about your personal data processing at Euria.
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientStyle: {
    height: 200,
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  },
  infinitScrollContainer: {
    flex: 0.65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    position: "relative",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  brandLogo: {
    height: 48,
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 2,
  },
  privacyText: {
    fontSize: 12,
    color: Colors.gray,

    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    fontSize: 12,

    color: Colors.accentBlue,
    textDecorationLine: "underline",
  },
});
