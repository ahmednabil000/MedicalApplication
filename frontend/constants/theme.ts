/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

type ColorsType = {
  main: string;
  secondary: string;
  mainGradient: string;
  white: string;
  black: string;
  accept: string;
  pending: string;
  reject: string;
  gray10: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  gray950: string;
};

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const lightColors: ColorsType = {
  main: "#018BBB",
  secondary: "#36BDEB",
  mainGradient: "",
  white: "#FFFFFF",
  black: "#000000",
  accept: "#00C53B",
  pending: "#FFCF10",
  reject: "#F43B3B",
  gray10: "#F4F7FE",
  gray50: "#F9FCFE",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",
  gray950: "#030712",
};

export const darkColors: ColorsType = {
  main: "#018BBB",
  secondary: "#36BDEB",
  mainGradient: "",
  white: "#1F2937",
  black: "#FFFFFF",
  accept: "#00C53B",
  pending: "#FFCF10",
  reject: "#F43B3B",
  gray10: "#111827",
  gray50: "#1F2937",
  gray100: "#374151",
  gray200: "#4B5563",
  gray300: "#6B7280",
  gray400: "#9CA3AF",
  gray500: "#D1D5DB",
  gray600: "#E5E7EB",
  gray700: "#F3F4F6",
  gray800: "#F9FCFE",
  gray900: "#F4F7FE",
  gray950: "#FFFFFF",
};

export const Colors = lightColors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
