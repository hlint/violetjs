import { flushSync } from "react-dom";
import { z } from "zod";
import type { StateCreator } from "zustand";
import type { RootStoreState } from "./_root";

const ThemeSchema = z.object({
  colorMode: z.enum(["system", "light", "dark"]).default("system"),
  isDark: z.boolean().default(true),
  palette: z.string().default("default"),
});
export type Theme = z.infer<typeof ThemeSchema>;
const THEME_STORAGE_KEY = "violet-ui-theme";

export type ThemeSlice = {
  theme: Theme & {
    isInitialized: boolean;
    boundingClientRect: DOMRect | null;
    initialize: () => void;
    refresh: (skipAnimate?: boolean) => void;
    save: () => void;
    setColorMode: (
      colorMode: Theme["colorMode"],
      skipAnimate?: boolean,
    ) => void;
    toggleColorMode: () => void;
    setIsDark: (isDark: boolean, skipAnimate?: boolean) => void;
    setPalette: (palette: Theme["palette"]) => void;
    setBoundingClientRect: (boundingClientRect: DOMRect | null) => void;
    pageTransitionAnimation: (domUpdates: () => void) => void;
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
      boundingClientRect: null,
      initialize: () => {
        const s = get().theme;
        if (!s.isInitialized) {
          s.refresh(true);
          set((d) => {
            d.theme.isInitialized = true;
          });
        }
      },
      refresh: (skipAnimate = false) => {
        let theme = ThemeSchema.parse({});
        try {
          theme = ThemeSchema.parse(
            JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || "{}"),
          );
        } catch (_error) {}
        set((d) => {
          const s = d.theme;
          s.palette = theme.palette;
        });
        get().theme.setColorMode(theme.colorMode, skipAnimate);
      },
      save: () => {
        localStorage.setItem(
          THEME_STORAGE_KEY,
          JSON.stringify(ThemeSchema.parse(get().theme)),
        );
      },
      setColorMode: (colorMode, skipAnimate = false) => {
        set((d) => {
          d.theme.colorMode = colorMode;
        });
        if (colorMode !== "system") {
          get().theme.setIsDark(colorMode === "dark", skipAnimate);
        } else {
          get().theme.setIsDark(
            window.matchMedia("(prefers-color-scheme: dark)").matches,
            skipAnimate,
          );
        }
        get().theme.save();
      },
      toggleColorMode: () => {
        get().theme.setColorMode(get().theme.isDark ? "light" : "dark");
      },
      setIsDark: async (isDark, skipAnimate = false) => {
        const action = () => {
          set((d) => {
            d.theme.isDark = isDark;
          });
          get().theme.save();
        };
        if (!skipAnimate) {
          get().theme.pageTransitionAnimation(() => {
            action();
          });
        } else {
          action();
        }
      },
      setPalette: (palette) => {
        get().theme.pageTransitionAnimation(() => {
          set((d) => {
            d.theme.palette = palette;
          });
          get().theme.save();
        });
      },
      setBoundingClientRect: (boundingClientRect) => {
        set((d) => {
          d.theme.boundingClientRect = boundingClientRect;
        });
      },
      pageTransitionAnimation: async (domUpdates: () => void) => {
        const rect = get().theme.boundingClientRect;
        // animation
        await document.startViewTransition(() => {
          flushSync(() => {
            domUpdates();
          });
        }).ready;
        if (rect) {
          const { top, left, width, height } = rect;
          const y = top + height / 2;
          const x = left + width / 2;

          const right = window.innerWidth - left;
          const bottom = window.innerHeight - top;
          const maxRad = Math.hypot(
            Math.max(left, right),
            Math.max(top, bottom),
          );

          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRad}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
          set((d) => {
            d.theme.boundingClientRect = null;
          });
        } else {
          document.documentElement.animate(
            {
              opacity: [0, 1],
            },
            {
              duration: 300,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        }
      },
    },
  };
};
