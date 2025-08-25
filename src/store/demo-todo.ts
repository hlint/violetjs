import type { StateCreator } from "zustand";
import type { DemoTodo, DemoTodoInsert } from "@/db/schema";
import { orpc } from "@/lib/orpc-client";
import { getSsrData } from "@/lib/ssr-data";
import type { RootStoreState } from "./_root";

export type DemoTodoSlice = {
  demoTodo: {
    isInitialized: boolean;
    isLoading: boolean;
    items: DemoTodo[];
    initialize: () => void;
    refresh: () => Promise<void>;
    addTodo: (todo: DemoTodoInsert) => Promise<void>;
    removeTodo: (id: number) => Promise<void>;
    toggleCompleted: (id: number) => Promise<void>;
  };
};

export const createDemoTodoSlice: StateCreator<
  RootStoreState,
  [["zustand/immer", never]],
  [],
  DemoTodoSlice
> = (set, get) => {
  const ssrTodos = getSsrData()?.demo_todos;
  return {
    demoTodo: {
      isInitialized: !!ssrTodos,
      isLoading: false,
      items: ssrTodos ?? [],
      initialize: () => {
        const s = get().demoTodo;
        if (!s.isLoading && !s.isInitialized) {
          s.refresh();
        }
      },
      refresh: async () => {
        set((d) => {
          d.demoTodo.isLoading = true;
        });
        return orpc.demo.todo
          .getTodos()
          .then((todos) => {
            set((d) => {
              d.demoTodo.items = todos;
              d.demoTodo.isLoading = false;
              d.demoTodo.isInitialized = true;
            });
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            set((d) => {
              d.demoTodo.isLoading = false;
            });
          });
      },
      addTodo: async (todo) => {
        await orpc.demo.todo.addTodo(todo);
        await get().demoTodo.refresh();
      },
      removeTodo: async (id) => {
        await orpc.demo.todo.removeTodo({ id });
        await get().demoTodo.refresh();
      },
      toggleCompleted: async (id) => {
        await orpc.demo.todo.toggleCompleted({ id });
        await get().demoTodo.refresh();
      },
    },
  };
};
