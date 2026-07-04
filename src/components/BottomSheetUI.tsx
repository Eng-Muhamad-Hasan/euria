import { Colors, Fonts } from "@/constants/theme";
import useLocationModalStore from "@/hooks/use-locationmodal";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface BottomSheetUIProps {
  children: React.ReactNode;
  hasButton?: boolean;
  buttonText?: string;
  buttonTextStyle?: Object;
  buttonStyle?: Object;
  visible?: boolean;
  onDismiss?: () => void;
}
export default function BottomSheetUI({
  children,
  buttonText,
  buttonTextStyle,
  buttonStyle,
  hasButton = true,
  visible,
  onDismiss,
}: BottomSheetUIProps) {
  const modalRef = useRef<BottomSheetModal>(null);
  const { close } = useLocationModalStore();
  useEffect(() => {
    if (visible === undefined) {
      return;
    }

    if (visible) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <View>
      {hasButton && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => modalRef.current?.present()}
          style={buttonStyle}
        >
          <Text style={buttonTextStyle}>{buttonText}</Text>
        </TouchableOpacity>
      )}
      <BottomSheetModal
        ref={modalRef}
        backgroundStyle={{ backgroundColor: Colors.pureWhite }}
        snapPoints={[0.6, 0.6]}
        enablePanDownToClose
        enableOverDrag={false}
        overDragResistanceFactor={0}
        onDismiss={close}
        onClose={close}
      >
        <BottomSheetView style={styles.contentContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.closeButton}
            onPress={() => {
              modalRef.current?.dismiss();
              onDismiss?.();
            }}
          >
            <Ionicons name="close" size={18} color={Colors.ultraDark} />
          </TouchableOpacity>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
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
