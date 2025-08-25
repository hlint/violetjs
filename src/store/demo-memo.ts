import type { StateCreator } from "zustand";
import type { RootStoreState } from "./_root";

export type DemoMemoSlice = {
  demoMemo: {
    content: string;
    setContent: (content: string) => void;
  };
};

export const createDemoMemoSlice: StateCreator<
  RootStoreState,
  [["zustand/immer", never]],
  [],
  DemoMemoSlice
> = (set) => {
  return {
    demoMemo: {
      content: "",
      setContent: (content: string) => {
        set((d) => {
          d.demoMemo.content = content;
        });
      },
    },
  };
};
