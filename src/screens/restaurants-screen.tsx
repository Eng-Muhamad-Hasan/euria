import HeaderAnimatedUI from "@/components/HeaderAnimatedUI";
import { CategoryList } from "@/components/restaurants/CategoryList";
import RestaurantsList from "@/components/restaurants/RestaurantsList";
import { Fonts } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RestaurantsScreen() {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });
  return (
    <View style={{ flex: 1 }}>
      <HeaderAnimatedUI title="Restaurants" scrollOffset={scrollOffset}/>
      <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 60,
        }}
      >
        <Text style={styles.pageTitle}>Restaurants</Text>
        <CategoryList />

        <Text style={styles.sectionTitle}>All restaurants</Text>
        <RestaurantsList />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 30,
    margin: 16,
    fontFamily: Fonts.brandBlack,
  },
  sectionTitle: {
    fontSize: 22,
    margin: 16,
    fontFamily: Fonts.brandBlack,
  },
});
