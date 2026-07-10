// layouts/stack.tsx
import "react-native-reanimated";
import type {
  ParamListBase,
  StackNavigationState,
} from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import {
  createNativeStackNavigator,
  type NativeStackNavigationEventMap,
  type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import {
  withScreenTransitions,
  type NativeStackAdapterOptions,
} from "react-native-screen-transitions";

const NativeStack = createNativeStackNavigator();
const { Navigator } = withScreenTransitions(NativeStack);

export const Stack = withLayoutContext<
  NativeStackAdapterOptions<NativeStackNavigationOptions>,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationEventMap
>(Navigator);
