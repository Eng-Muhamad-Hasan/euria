import { Colors, Fonts } from "@/constants/theme";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabsLayout() {
  return (
    <NativeTabs
      blurEffect="dark"
      minimizeBehavior="onScrollDown"
      indicatorColor={Colors.dark}
      rippleColor={Colors.accentBlue}
      labelStyle={{
        fontSize: 10,
        color: Colors.ultraDark,
        fontFamily: Fonts.brandBlack,

      }}
      iconColor={{
        default: Colors.dark,
        selected: Colors.primaryLight,
      }}
      backgroundColor={Colors.lightGray}

    >
        
      <NativeTabs.Trigger  name="restaurants">
        <NativeTabs.Trigger.Label>Restaurants</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md={"fastfood"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="discovery">
        <NativeTabs.Trigger.Label>Discovery</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md={"explore"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stores">
        <NativeTabs.Trigger.Label>Stores</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md={"storefront"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md={"search"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md={"person"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
