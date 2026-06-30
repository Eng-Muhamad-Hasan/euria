import { Colors, Fonts } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AppleAuthButton from "./auth/AppleAuthButton";
import GoogleAuthButton from "./auth/GoogleAuthButton";
export default function BottomSheetUI() {
  const { setIsGuest } = useUserStore();
  const modalRef = useRef<BottomSheetModal>(null);
  const guestHandler = () => {
    setIsGuest(true);
  };
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => modalRef.current?.present()}
        style={styles.textButton}
      >
        <Text style={styles.textButtonContent}>Other Options</Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={modalRef}
        backgroundStyle={{ backgroundColor: Colors.primaryLight }}
        snapPoints={[0.6, 0.6]}
        enablePanDownToClose
        enableOverDrag={false}
        overDragResistanceFactor={0}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.closeButton}
            onPress={() => modalRef.current?.dismiss()}
          >
            <Ionicons name="close" size={18} color={Colors.ultraDark} />
          </TouchableOpacity>
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
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
const styles = StyleSheet.create({
  textButton: {
    backgroundColor: Colors.lightGray,
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
    backgroundColor: Colors.primaryLight,
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
