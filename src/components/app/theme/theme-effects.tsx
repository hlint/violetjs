import { Helmet } from "@dr.pogodin/react-helmet";
import { useEffect, useLayoutEffect } from "react";
import { isServer } from "@/lib/utils";
import { useThemeStore } from "@/store/_root";
import { getPaletteStyles } from "./utils/get-palette-styles";

const THEME_PALETTE_STYLE_STORAGE_KEY = "violet-ui-theme-palette-style";

export function ThemeEffects() {
  const { isInitialized, palette, colorMode, isDark, setIsDark, initialize } =
    useThemeStore();
  useLayoutEffect(() => {
    initialize();
    // remove the initial style
    const initialStyle = document.getElementById("theme-palette-initial-style");
    if (initialStyle) {
      initialStyle.remove();
    }
  }, [initialize]);
  useLayoutEffect(() => {
    if (!isInitialized) {
      return;
    }
    if (colorMode === "system") {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    const handleChange = (e: MediaQueryListEvent) => {
      if (colorMode === "system") {
        setIsDark(e.matches);
      }
    };
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChange);
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChange);
    };
  }, [isInitialized, colorMode, setIsDark]);
  useLayoutEffect(() => {
    if (!isInitialized) {
      return;
    }
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
  }, [isInitialized, isDark]);
  useEffect(() => {
    localStorage.setItem(
      THEME_PALETTE_STYLE_STORAGE_KEY,
      getPaletteStyles(palette)
    );
  }, [palette]);
  if (isServer()) {
    return null;
  }
  return (
    <Helmet>
      <style>{getPaletteStyles(palette)}</style>
    </Helmet>
  );
}
