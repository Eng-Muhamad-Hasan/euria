import { Colors, Fonts } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppleAuthButton from "../auth/AppleAuthButton";
import GoogleAuthButton from "../auth/GoogleAuthButton";
import BottomSheetUI from "../BottomSheetUI";

export default function OtherOptionsModal() {
  const { setIsGuest } = useUserStore();
  const guestHandler = () => {
    setIsGuest(true);
  };
  return (
    <BottomSheetUI
      buttonText="Other Options"
      buttonStyle={styles.textButton}
      buttonTextStyle={styles.textButtonContent}
    >
      <Animated.View entering={FadeInDown.delay(100)}>
        <Text style={styles.titleStyle}>Login or Create a new Account</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Animated.View entering={FadeInDown.delay(200)}>
          <AppleAuthButton />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300)}>
          <GoogleAuthButton />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400)}>
          <TouchableOpacity activeOpacity={0.8} onPress={guestHandler}>
            <Text style={styles.guestButton}>Continue as guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </BottomSheetUI>
  );
}

const styles = StyleSheet.create({

  textButton: {
    backgroundColor: Colors.pureWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    gap: 5,
  },
  textButtonContent: {
    color: Colors.muted,
    fontSize: 18,
    fontFamily: Fonts.brandSemiBold,
  },
  guestButton: {
    textAlign: "center",
    color: Colors.darkBlue,
    fontSize: 18,
    fontFamily: Fonts.brandBlack,
    marginVertical: 10,
  },
  contentContainer: {
    backgroundColor: Colors.pureWhite,
    padding: 16,
    alignItems: "center",
  },
  buttonContainer: {
    gap: 15,
    width: "100%",
  },
  closeButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: "50%",
    padding: 8,
    alignSelf: "flex-end",
  },
  titleStyle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 24,
    marginBottom: 24,
  },
});
