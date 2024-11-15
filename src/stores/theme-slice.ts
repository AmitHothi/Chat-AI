import { StoreApi } from "zustand/vanilla";

import { Style } from "@/lib/styles";
import { Theme } from "@/lib/themes";
import { THEME_KEY } from "@/constants";

export type ThemeConfig = {
  style: Style["name"];
  theme: Theme["name"];
  radius: number;
};

export const defaultTheme: ThemeConfig = {
  style: "default",
  theme: "zinc",
  radius: 0.5,
};

export type ThemeState = {
  themeConfig: ThemeConfig;
};

export type ThemeActions = {
  setThemeConfig: (theme: ThemeConfig) => void;
};

export type ThemeSlice = ThemeState & ThemeActions;

// Define the theme slice with argument passing
export const createThemeSlice = (
  set: StoreApi<ThemeSlice>["setState"],
): ThemeSlice => ({
  themeConfig: defaultTheme,
  setThemeConfig: (newTheme: ThemeConfig) =>
    set((state: ThemeSlice) => ({
      themeConfig: { ...state.themeConfig, ...newTheme },
    })),
});
