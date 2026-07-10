import ViewOrderButton from "@/components/buttons/ViewOrderButton";
import DetailsHeader from "@/components/restaurants/DetailsHeader";
import { MenuItem } from "@/components/restaurants/MenuItem";
import { Colors, Fonts } from "@/constants/theme";
import { Dish } from "@/data/restaurant_menu";
import { useMenu } from "@/hooks/useMenu";
import { useRestaurant } from "@/hooks/useRestaurants";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const TAB_WIDTH = 100;
const IMAGE_HEIGHT = 300;
const STICKY_THRESHOLD_START = 280;
const STICKY_THRESHOLD_END = 350;
const { width } = Dimensions.get("window");

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<Dish>);

const RestaurantDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionListRef = useRef<SectionList>(null);
  const categoryScrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const { data: restaurant, isLoading: isRestaurantLoading } = useRestaurant(
    id || "",
  );

  const { data: menu, isLoading: isMenuLoading } = useMenu(id || "");
  const sections =
    menu?.map((category) => ({
      title: category.category,
      subtitle: category.subtitle,
      data: category.dishes,
    })) || [];
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  function categoryTabHandler(index: number) {
    setActiveCategory(index);
    sectionListRef?.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
      viewOffset: insets.top + 100,
      viewPosition: 0,
    });
  }

  const scrollToCategoryTab = (index: number) => {
    categoryScrollRef.current?.scrollTo({
      x: index * TAB_WIDTH - width / 2 + TAB_WIDTH / 2,
      animated: true,
    });
  };
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        const firstViewableSection = viewableItems[0].section;
        const sectionIndex = sections.findIndex(
          (s) => s.title === firstViewableSection.title,
        );
        if (sectionIndex !== -1 && sectionIndex !== activeCategory) {
          setActiveCategory(sectionIndex);
          scrollToCategoryTab(sectionIndex);
        }
      }
    },
    [sections, activeCategory],
  );

  const parallaxStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [0, 100],
      [1.5, 1],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(
      scrollOffset.value,
      [0, 400],
      [0, -150],
      Extrapolation.CLAMP,
    );
    return { transform: [{ scale }, { translateY }] };
  });

  const opacityOverlayAnimate = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, 70],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return { opacity };
  });
  const stickyTabsAnimate = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [STICKY_THRESHOLD_START, STICKY_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP,
    );

    //  const zIndex = interpolate(
    //       scrollOffset.value,
    //       [0, STICKY_THRESHOLD_END* 1.1],
    //       [0, 1],
    //       Extrapolation.CLAMP,
    //     );

    const translateY = interpolate(
      scrollOffset.value,
      [STICKY_THRESHOLD_START, STICKY_THRESHOLD_END],
      [-10, 0],
      Extrapolation.CLAMP,
    );

    return { transform: [{ translateY }], opacity };
  });

  if (isRestaurantLoading || isMenuLoading)
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.accentBlue} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.backgroundImage, parallaxStyle]}
        resizeMode={"cover"}
        source={restaurant?.image!}
      />
      <Animated.View style={[styles.whiteOverlay, opacityOverlayAnimate]} />

      <DetailsHeader scrollOffset={scrollOffset} />

      <Animated.View
        style={[
          styles.stickyTabsOverlay,
          stickyTabsAnimate,
          { top: insets.top + 64 },
        ]}
      >
        <View style={styles.categoryTabsContainer}>
          <ScrollView
            horizontal
            ref={categoryScrollRef}
            contentContainerStyle={styles.categoryTabs}
            showsHorizontalScrollIndicator={false}
          >
            {menu?.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryTab,
                  activeCategory === index && styles.categoryTabActive,
                ]}
                onPress={() => categoryTabHandler(index)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    activeCategory === index && styles.categoryTabTextActive,
                  ]}
                >
                  {category.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      <AnimatedSectionList
        ref={sectionListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        sections={sections}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        bounces
        alwaysBounceVertical
        bouncesZoom
        onScroll={scrollHandler}
        renderSectionHeader={({ section }: { section: any }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.subtitle && (
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            )}
          </View>
        )}
        renderItem={({ item }) => <MenuItem dish={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.spacerImage} />
            <Animated.View style={[styles.curveContainer]}>
              <Svg
                height={30}
                width={width}
                viewBox={`0 0 ${width} 30`}
                style={[{ position: "absolute", top: -29, left: 0 }]}
              >
                <Path
                  d={`M 0,30 Q ${width / 2},0 ${width},30 L ${width},30 L 0,30 Z`}
                  fill={"#fff"}
                />
              </Svg>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={restaurant?.image!} />
              </View>
              {/* Restaurant Info */}
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant?.name}</Text>
                <View style={styles.infoRow}>
                  <Ionicons name="star" size={16} color={Colors.plasmaOrange} />
                  <Text style={styles.infoText}>{restaurant?.rating}</Text>
                  <Text style={styles.infoDot}>•</Text>
                  <Text style={styles.infoText}>Open until 21:30</Text>
                  <Text style={styles.infoDot}>•</Text>
                  <Text style={styles.infoText}>
                    Min. order {restaurant?.minOrder.toFixed(2)} €
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoText}>
                    Delivery {restaurant?.deliveryFee.toFixed(2)} €
                  </Text>
                  <Text style={styles.infoDot}>•</Text>
                  {/* <TouchableOpacity>
                    <Text style={styles.moreLink}>More</Text>
                  </TouchableOpacity> */}
                </View>
              </View>

              {/* Delivery Info */}
              <View style={styles.deliveryInfo}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.deliveryButton}
                >
                  <Ionicons
                    name="speedometer"
                    size={16}
                    color={Colors.accentBlue}
                  />
                  <Text style={styles.deliveryText}>
                    Delivery {restaurant?.deliveryTime}
                  </Text>
                  {/* <Ionicons
                    name="chevron-down"
                    size={16}
                    color={Colors.accentBlue}
                  /> */}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconButtonSmall}
                >
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={Colors.pureWhite}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.iconButtonSmall}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={Colors.pureWhite}
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </>
        }
      />
      <ViewOrderButton restaurant={restaurant!} />
    </View>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    width,
  },
  whiteOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    width,
    backgroundColor: Colors.background,
  },
  sectionHeader: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.brandBlack,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.brandSemiBold,
    color: Colors.gray,
  },
  spacerImage: {
    height: IMAGE_HEIGHT - 50,
  },
  curveContainer: {
    paddingTop: 30,
    marginTop: -30,
    backgroundColor: Colors.background,
    overflow: "visible",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: -65,
    marginBottom: 16,
  },
  logo: {
    height: 80,
    width: 80,
    borderRadius: 16,
    borderWidth: 3,
    backgroundColor: Colors.background,
    borderColor: Colors.background,
  },
  restaurantInfo: {
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontFamily: Fonts.brandBlack,
    color: Colors.dark,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.carbon,
    fontFamily: Fonts.brandSemiBold,
  },
  infoDot: {
    fontSize: 14,
    color: Colors.darkBlue,
  },
  moreLink: {
    fontSize: 14,
    color: Colors.darkBlue,
    fontFamily: Fonts.brandSemiBold,
  },
  deliveryInfo: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  deliveryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: Colors.pureWhite,
    fontFamily: Fonts.brandSemiBold,
  },
  iconButtonSmall: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: Colors.accentBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  // Sticky Header Section
  stickyTabsOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: Colors.background,

    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  categoryTabsContainer: {
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
  categoryTabs: {
    paddingTop: 12,
    paddingHorizontal: 16,
    gap: 20,
  },
  categoryTab: {
    paddingBottom: 12,
  },
  categoryTabActive: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.darkBlue,
  },
  categoryTabText: {
    fontSize: 15,
    color: Colors.carbon,
    fontFamily: Fonts.brandMedium,
  },
  categoryTabTextActive: {
    color: Colors.darkBlue,
    // fontFamily: Fonts.brandBlack,
  },
});
