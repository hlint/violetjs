import { Helmet } from "@dr.pogodin/react-helmet";
import { useLayoutEffect } from "react";
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

  return (
    <Helmet>
      <style>{getPaletteStyles(palette)}</style>
    </Helmet>
  );
}
