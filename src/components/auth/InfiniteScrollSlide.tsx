import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ITEM_HEIGHT = 160;
// const GAP = 10;
const SCROLL_SPEED = 20; // pixels per second
const iconDataSets = {
  set1: [
    { Icon: "🍕", color: "#B2D5E5" },
    { Icon: "🍔", color: "#B2D5E5" },
    { Icon: "🍟", color: "#B2D5E5" },
    { Icon: "🍖", color: "#B2D5E5" },
    { Icon: "🌭", color: "#B2D5E5" },
  ],
  set2: [
    { Icon: "🍿", color: "#FF7F7F" },
    { Icon: "🥐", color: "#FF7F7F" },
    { Icon: "🥨", color: "#FF7F7F" },
    { Icon: "🌮", color: "#FF7F7F" },
    { Icon: "🍪", color: "#FF7F7F" },
  ],
  set3: [
    { Icon: "🥝", color: "#C6FF34" },
    { Icon: "🍉", color: "#C6FF34" },
    { Icon: "🫐", color: "#C6FF34" },
    { Icon: "🍄", color: "#C6FF34" },
    { Icon: "🍇", color: "#C6FF34" },
  ],
};

interface InfiniteScrollType {
  scrollDirection?: "up" | "down";
  iconSet?: "set1" | "set2" | "set3";
}

export default function InfiniteScrollSlide({
  scrollDirection = "down",
  iconSet = "set1",
}: InfiniteScrollType) {
  const progress = useSharedValue(0);
  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData];
  const totalSlideHeight = iconData.length * (ITEM_HEIGHT ) - ITEM_HEIGHT;
  const duration = (totalSlideHeight / SCROLL_SPEED) * 1000;

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(totalSlideHeight, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [duration, scrollDirection]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY:
          scrollDirection === "down" ? -progress.value : progress.value,
      },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.track, animatedStyle]}>
        {items.map((item, i) => (
          <View
            key={i}
            style={[styles.itemContainer, { backgroundColor: item.color }]}
          >
            <Text style={styles.iconText}>{item.Icon}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: "hidden",
    paddingVertical: 20,
  },
  track: {
    alignItems: "center",
  },
  itemContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  iconText: {
    fontSize: 40,
  },
});
