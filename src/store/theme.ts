import { z } from "zod";
import type { StateCreator } from "zustand";
import type { RootStoreState } from "./_root";

const ThemeSchema = z.object({
  colorMode: z.enum(["system", "light", "dark"]).default("system"),
  isDark: z.boolean().default(false),
  palette: z.string().default("default"),
});
export type Theme = z.infer<typeof ThemeSchema>;
const THEME_STORAGE_KEY = "violet-ui-theme";

export type ThemeSlice = {
  theme: Theme & {
    isInitialized: boolean;
    isLoading: boolean;
    initialize: () => void;
    refresh: () => void;
    save: () => void;
    setColorMode: (colorMode: Theme["colorMode"]) => void;
    toggleColorMode: () => void;
    setIsDark: (isDark: boolean) => void;
    setPalette: (palette: Theme["palette"]) => void;
  };
};

export const createThemeSlice: StateCreator<
  RootStoreState,
  [["zustand/immer", never]],
  [],
  ThemeSlice
> = (set, get) => {
  return {
    theme: {
      ...ThemeSchema.parse({}),
      isInitialized: false,
      isLoading: false,
      initialize: () => {
        const s = get().theme;
        if (!s.isLoading && !s.isInitialized) {
          s.refresh();
        }
      },
      refresh: () => {
        let theme = ThemeSchema.parse({});
        try {
          theme = ThemeSchema.parse(
            JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "{}"),
          );
        } catch (_error) {}
        set((d) => {
          const s = d.theme;
          s.isInitialized = true;
          s.isLoading = false;
          s.palette = theme.palette;
        });
        get().theme.setColorMode(theme.colorMode);
      },
      save: () => {
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify(ThemeSchema.parse(get().theme)),
        );
      },
      setColorMode: (colorMode) => {
        set((d) => {
          d.theme.colorMode = colorMode;
        });
        if (colorMode !== "system") {
          get().theme.setIsDark(colorMode === "dark");
        } else {
          get().theme.save();
        }
      },
      toggleColorMode: () => {
        get().theme.setColorMode(get().theme.isDark ? "light" : "dark");
      },
      setIsDark: (isDark) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(isDark ? "dark" : "light");
        set((d) => {
          d.theme.isDark = isDark;
        });
        get().theme.save();
      },
      setPalette: (palette) => {
        set((d) => {
          d.theme.palette = palette;
        });
        get().theme.save();
      },
    },
  };
};
