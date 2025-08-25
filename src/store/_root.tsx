import { createContext, useContext, useRef } from "react";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createDemoMemoSlice, type DemoMemoSlice } from "./demo-memo";
import { createDemoTodoSlice, type DemoTodoSlice } from "./demo-todo";
import { createSessionSlice, type SessionSlice } from "./session";

export type RootStoreState = DemoMemoSlice & DemoTodoSlice & SessionSlice;

type RootStoreInstance = ReturnType<typeof createRootStore>;

function createRootStore() {
  const store = createStore<RootStoreState>()(
    immer((...a) => ({
      ...createSessionSlice(...a),
      ...createDemoMemoSlice(...a),
      ...createDemoTodoSlice(...a),
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

export function useRootStore<T>(selector: (state: RootStoreState) => T): T {
  const store = useContext(RootStoreContext);
  if (!store) throw new Error("Missing RootStoreContext.Provider in the tree");
  return useStore(store, selector);
}

export function useDemoTodoStore<T>(
  selector: (state: DemoTodoSlice["demoTodo"]) => T,
): T {
  return useRootStore((s) => selector(s.demoTodo));
}

export function useDemoMemoStore<T>(
  selector: (state: DemoMemoSlice["demoMemo"]) => T,
): T {
  return useRootStore((s) => selector(s.demoMemo));
}

export function useSessionStore<T>(
  selector: (state: SessionSlice["session"]) => T,
): T {
  return useRootStore((s) => selector(s.session));
}
