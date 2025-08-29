import { Helmet } from "@dr.pogodin/react-helmet";
import Cookies from "js-cookie";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { getSsrData } from "@/lib/ssr-data";
import {
  storageKeyColorMode,
  storageKeyIsDark,
  storageKeyPalette,
  type ThemeColorMode,
  type ThemePalette,
} from "@/lib/types";
import { getPaletteStyles } from "./utils/get-palette-styles";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  colorMode: ThemeColorMode;
  isDark: boolean;
  setColorMode: (colorMode: ThemeColorMode) => void;
  toggleColorMode: () => void;
  palette: ThemePalette;
  setPalette: (palette: ThemePalette) => void;
};

const initialState: ThemeProviderState = {
  colorMode: "system",
  isDark: false,
  setColorMode: () => null,
  toggleColorMode: () => null,
  palette: "default",
  setPalette: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(getSsrData()?.themeIsDark || false);
  const [colorMode, setColorMode] = useState<ThemeColorMode>(
    getSsrData()?.themeColorMode || "system"
  );
  const [palette, setPalette] = useState<ThemePalette>(
    getSsrData()?.themePalette || "default"
  );

  useLayoutEffect(() => {
    Cookies.set(storageKeyColorMode, colorMode, {
      expires: 365,
    });
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (colorMode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setIsDark(systemTheme === "dark");
      return;
    }

    root.classList.add(colorMode);
    setIsDark(colorMode === "dark");
  }, [colorMode]);

  useEffect(() => {
    Cookies.set(storageKeyIsDark, isDark.toString(), {
      expires: 365,
    });
  }, [isDark]);

  useEffect(() => {
    Cookies.set(storageKeyPalette, palette, {
      expires: 365,
    });
  }, [palette]);

  const value = {
    colorMode,
    isDark,
    setColorMode: (colorMode: ThemeColorMode) => {
      setColorMode(colorMode);
    },
    toggleColorMode: () => {
      setColorMode(isDark ? "light" : "dark");
    },
    palette,
    setPalette: (palette: ThemePalette) => {
      setPalette(palette);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      <Helmet>
        <style>{getPaletteStyles(palette)}</style>
      </Helmet>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
