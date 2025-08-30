import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createThemeSlice, type ThemeSlice } from "./theme";

export type RootStoreState = ThemeSlice;

type RootStoreInstance = ReturnType<typeof createRootStore>;

function createRootStore() {
  const store = createStore<RootStoreState>()(
    immer((...a) => ({
      ...createThemeSlice(...a),
    })),
  );
  return store;
}

export const RootStoreContext = createContext<RootStoreInstance | null>(null);

export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  const store = useRef(createRootStore()).current;
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  );
}

// Root Store Hook
export function useRootStore<T>(selector: (state: RootStoreState) => T): T {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error("Missing RootStoreContext.Provider in the tree");
  return useStore(store, selector);
}

// Slice Hooks
export const useThemeStore = creatorSliceHook((s) => s.theme);

function creatorSliceHook<Slice>(
  sliceSelector: (state: RootStoreState) => Slice,
) {
  const useSliceStore: {
    (): Slice;
    <T>(selector?: (sliceState: Slice) => T): T;
  } = <T,>(selector?: (sliceState: Slice) => T): T | Slice => {
    return useRootStore((s) => {
      const slice = sliceSelector(s);
      if (!selector) {
        return slice;
      }
      return selector(slice);
    });
  };
  return useSliceStore;
}
