import { useMemo } from "react";
import { ScaledSize, useWindowDimensions } from "react-native";

export type ResponsiveScreenMode = "compact" | "medium" | "expanded";

export type ResponsiveValueMap<T> = {
  compact: T;
  medium: T;
  expanded: T;
};

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const MIN_FONT_SCALE = 0.85;
const MAX_FONT_SCALE = 1.25;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getScreenMode = (width: number): ResponsiveScreenMode => {
  if (width >= 900) {
    return "expanded";
  }
  if (width >= 600) {
    return "medium";
  }
  return "compact";
};

const getResponsiveFontSize = (value: number, size: ScaledSize) => {
  const widthScale = size.width / BASE_WIDTH;
  const heightScale = size.height / BASE_HEIGHT;
  const scale = clamp(
    Math.min(widthScale, heightScale),
    MIN_FONT_SCALE,
    MAX_FONT_SCALE,
  );

  return Math.round(value * scale);
};

export const useResponsive = () => {
  const screen = useWindowDimensions();

  return useMemo(() => {
    const mode = getScreenMode(screen.width);
    const orientation =
      screen.width >= screen.height ? "landscape" : "portrait";

    const rf = (value: number) => getResponsiveFontSize(value, screen);

    const rv = <T>(values: ResponsiveValueMap<T>): T => {
      return values[mode];
    };

    return {
      width: screen.width,
      height: screen.height,
      orientation,
      mode,
      isCompact: mode === "compact",
      isMedium: mode === "medium",
      isExpanded: mode === "expanded",
      rf,
      rv,
      viewport: {
        width: screen.width,
        height: screen.height,
        orientation,
        mode,
      },
    };
  }, [screen.height, screen.width]);
};
