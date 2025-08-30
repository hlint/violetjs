import { Helmet } from "@dr.pogodin/react-helmet";
import { useEffect, useLayoutEffect } from "react";
import { useThemeStore } from "@/store/_root";
import { getPaletteStyles } from "./utils/get-palette-styles";

export function ThemeWatcher() {
  const { isInitialized, palette, colorMode, setIsDark, initialize } =
    useThemeStore();
  useLayoutEffect(() => {
    initialize();
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
  useEffect(() => {
    if (isInitialized) {
      window.document.body.style.opacity = "1";
    }
  }, [isInitialized]);

  return (
    <Helmet>
      <style>{getPaletteStyles(palette)}</style>
    </Helmet>
  );
}
