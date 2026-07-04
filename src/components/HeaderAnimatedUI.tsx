import { Colors, Fonts } from "@/constants/theme";
import useLocationModalStore from "@/hooks/use-locationmodal";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LocationModal from "./modals/LocationModal";

interface AnimatedHeaderProps {
  title: string;
  scrollOffset: SharedValue<number>;
}

const SCROLL_THRESHOLD = 60;

export default function HeaderAnimatedUI({
  title,
  scrollOffset,
}: AnimatedHeaderProps) {
  const openLocationModal = useLocationModalStore((state) => state.open);
  const insets = useSafeAreaInsets();
  const header1Animation = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD * 0.6],
      [0, -10],
      Extrapolation.CLAMP,
    );

    return { opacity, transform: [{ translateY }] };
  });
  const header2Animation = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD * 0.3, SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD * 0.3, SCROLL_THRESHOLD],
      [-10, 0],
      Extrapolation.CLAMP,
    );

    return { opacity, transform: [{ translateY }] };
  });
  const shadowAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return { shadowOpacity: opacity * 0.1, elevation: opacity * 5 };
  });
  return (
    <>
      <Animated.View
        style={[
          styles.headerContainer,
          { paddingTop: insets.top },
          shadowAnimation,
        ]}
      >
        {/* Header 1 */}
        <Animated.View style={[styles.header1, header1Animation]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.locationButton}
            onPress={openLocationModal}
          >
            <View style={styles.locationButtonIcon}>
              <Ionicons name="business-outline" size={16} />
            </View>
            <Text style={styles.locationText}>Berlin</Text>

            <Ionicons name="chevron-down" size={16} />
          </TouchableOpacity>
          <View style={styles.rightIcons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
            <Link href={"/(app)/(auth)/(modal)/map"} asChild>
              <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
                <Ionicons name="map-outline" size={20} />
              </TouchableOpacity>
            </Link>
          </View>
        </Animated.View>
        {/* Header 2 */}
        <Animated.View style={[styles.header2, header2Animation, {}]}>
          <View style={styles.centerContent}>
            <Text style={styles.titleSmall}>{title}</Text>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.locationSmall]}
              onPress={openLocationModal}
            >
              <Text style={styles.locationSmallText}>Berlin</Text>
              <Ionicons name="chevron-down" size={14} />
            </TouchableOpacity>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
      <LocationModal />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: Colors.pureWhite,
    borderCurve: "circular",
    borderBottomLeftRadius: "15%",
    borderBottomRightRadius: "15%",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  header1: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // overflow: "hidden",
  },
  locationText: {
    fontSize: 14,
    fontFamily: Fonts.brandBlack,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "50%",
    gap: 6,
  },

  locationButtonIcon: {
    backgroundColor: Colors.light,
    borderRadius: "50%",
    padding: 10,
  },
  rightIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    height: 40,
    width: 40,
    backgroundColor: Colors.light,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  header2: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "auto",
  },
  titleSmall: {
    fontSize: 16,
    fontFamily: Fonts.brandBlack,
    marginBottom: 2,
  },
  locationSmall: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  locationSmallText: {
    fontSize: 12,
    fontFamily: Fonts.brandBlack,
    color: Colors.muted,
  },
});
