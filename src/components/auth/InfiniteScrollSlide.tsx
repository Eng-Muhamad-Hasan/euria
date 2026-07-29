import Ionicons from "@react-native-vector-icons/ionicons";
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
    { Icon: 'fast-food', color: "#B2D5E5" },
    { Icon: 'fast-food' ,color: "#B2D5E5" },
    { Icon: 'fast-food' ,color: "#B2D5E5" },
    { Icon: 'fast-food', color: "#B2D5E5" },
    { Icon: 'fast-food', color: "#B2D5E5" },
    
  ],
  set2: [
    { Icon: 'restaurant' ,color: "#B2D5E5" },
    { Icon: 'restaurant', color: "#B2D5E5" },
    { Icon: 'restaurant', color: "#B2D5E5" },
    { Icon: 'restaurant', color: "#B2D5E5" },
    { Icon: 'restaurant', color: "#B2D5E5" },
    
  ],
  set3: [
  { Icon: 'storefront' ,color: "#B2D5E5" },
  { Icon: 'storefront', color: "#B2D5E5" },
  { Icon: 'storefront', color: "#B2D5E5" },
  { Icon: 'storefront', color: "#B2D5E5" },
  { Icon: 'storefront', color: "#B2D5E5" },

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
          <View key={i} style={[styles.itemContainer,{backgroundColor:'#0f0f0a'}]}>
            {/* <Text style={styles.iconText}>{item.Icon}</Text> */}
            {/* <Image
              key={i}
              style={{ height: 160, width: 160 }}
              source={item.Icon}
              contentPosition={"center"}
              contentFit="cover"
            /> */}
            <Ionicons name={item.Icon as any} size={55} color='#cacaca' />
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
    borderRadius: 16,
    marginBottom: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    overflow:'hidden'
  },
  iconText: {
    fontSize: 40,
  },
});
