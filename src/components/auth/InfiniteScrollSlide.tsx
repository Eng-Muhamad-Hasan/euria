import { StyleSheet, Text, View } from "react-native";
import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

import { useEffect } from "react";

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; //pixels per second
const FRAME_RATE = 60; // frames per second
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
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const iconData = iconDataSets[iconSet];
  const doubleItems = [...iconData, ...iconData];
  const totalSlideHeight = iconData.length * ITEM_HEIGHT;

  useEffect(() => {
    if (scrollDirection === "up") {
      scrollY.value = totalSlideHeight;
    } else {
      scrollY.value = 0;
    }

    const interval = setInterval(() => {
      const increment =
        (SCROLL_SPEED / FRAME_RATE) * (scrollDirection === "up" ? -1 : 1);
      scrollY.value += increment;
    }, 1000 / FRAME_RATE);

    return () => clearInterval(interval);
  }, [scrollDirection]);

  useAnimatedReaction(
    () => scrollY.value,
    (y) => {
      if (scrollDirection === "down") {
        if (y >= totalSlideHeight) {
          scrollY.value = 0;
          scrollTo(scrollRef, 0, 0, true);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      } else {
        if (y <= 0) {
          scrollY.value = totalSlideHeight;
          scrollTo(scrollRef, 0, totalSlideHeight, true);
        } else {
          scrollTo(scrollRef, 0, y, false);
        }
      }
    },
  );

  return (
    <Animated.ScrollView
      ref={scrollRef}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    >
      {doubleItems.map((item, i) => (
        <View
          key={i}
          style={[styles.itemContainer, { backgroundColor: item.color }]}
        >
          <Text style={{ fontSize: 40 }}>{item.Icon}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 20,
    gap: 10,
  },
  itemContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 5,
    boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
  },
});
