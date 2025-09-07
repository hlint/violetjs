import { Helmet } from "@dr.pogodin/react-helmet";
import { useLayoutEffect } from "react";
import { isServer } from "@/lib/utils";
import { useThemeStore } from "@/store/_root";
import { getPaletteStyles } from "./utils/get-palette-styles";

export function ThemeEffects() {
  const { isInitialized, palette, colorMode, isDark, setIsDark, initialize } =
    useThemeStore();
  useLayoutEffect(() => {
    initialize();
  }, [initialize]);
  useLayoutEffect(() => {
    if (isInitialized) {
      window.document.documentElement.style.opacity = "1";
    }
  }, [isInitialized]);
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
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
  }, [isDark]);
  if (isServer()) {
    return null;
  }
  return (
    <Helmet>
      <style>{getPaletteStyles(palette)}</style>
    </Helmet>
  );
}
