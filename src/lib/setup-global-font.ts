import { Fonts } from "@/constants/theme";
import { Text, TextInput } from "react-native";

let isSetup = false;

type ComponentWithDefaultProps = {
  defaultProps?: { style?: { fontFamily?: string } };
};

function setDefaultFontFamily(
  Component: typeof Text | typeof TextInput,
  fontFamily: string,
) {
  const component = Component as typeof Component & ComponentWithDefaultProps;
  component.defaultProps = component.defaultProps ?? {};
  component.defaultProps.style = { fontFamily };
}

export function setupGlobalFont() {
  if (isSetup) return;
  isSetup = true;

  setDefaultFontFamily(Text, Fonts.brand);
  setDefaultFontFamily(TextInput, Fonts.brand);
}
