import { Colors } from "@/constants/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuButton from "../MenuButton";

interface DetailsHeaderProps {
  scrollOffset: SharedValue<number>;
}
const SCROLL_THRESHOLD_START = 50;
const SCROLL_THRESHOLD_END = 80;

const DetailsHeader = ({ scrollOffset }: DetailsHeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const headerAnimateStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],

      [0, 1],
      Extrapolation.CLAMP,
    );
    const shadowOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],

      [0, 0.1],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: `rgba(255,255,255,${backgroundOpacity})`,
      shadowOpacity,
    };
  });
  const searchBarAnimateStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_START],

      [0.5, 1],
      Extrapolation.CLAMP,
    );

    return {
      backgroundColor: `rgba(233,234,235,${backgroundOpacity})`,
    };
  });
  const buttonAnimateStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],

      [1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      zIndex: 1,
    };
  });
  const buttonAnimateStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START * 0.3, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const zIndex = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      zIndex,
    };
  });

  return (
    <Animated.View
      style={[styles.container, headerAnimateStyle, { paddingTop: insets.top }]}
    >
      <View style={[styles.headerContent]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.carbon} />
        </TouchableOpacity>

        <Animated.View style={[styles.searchBar, searchBarAnimateStyle]}>
          <Ionicons name="search" size={24} color={Colors.carbon} />
          <TextInput
            placeholder="Search ..."
            placeholderTextColor={Colors.carbon}
            maxLength={35}
            style={{paddingHorizontal:12,flex:1}}
            textBreakStrategy="balanced"
          />
        </Animated.View>
        <View style={{ width: 40, height: 40 }} />
        <Animated.View style={[styles.trailingButton, buttonAnimateStyle]}>
          <Ionicons name="heart-outline" size={24} color={Colors.carbon} />
        </Animated.View>

        <Animated.View style={[styles.trailingButton, buttonAnimateStyle2]}>
          <MenuButton />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    boxShadow: "0px 4px 2px -2px rgba(0,0,0,0.05)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: `rgba(233,234,235,0.5)`,

    boxShadow: "0px 4px 2px -2px rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  trailingButton: {
    position: "absolute",
    top: "50%",
    right: 16,
    transform: [{ translateY: "-25%" }],
    height: 40,
    width: 40,
    borderRadius: "50%",
    backgroundColor: `rgba(233,234,235,0.5)`,

    boxShadow: "0px 4px 2px -2px rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 5,
    paddingHorizontal: 12,
    gap: 4,
    borderRadius: 25,
    // backgroundColor: Colors.light,
  },
});
