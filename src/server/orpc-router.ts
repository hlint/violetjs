import {
  addTodo,
  getTodos,
  removeTodo,
  toggleCompleted,
} from "@/pages/demo/todo/actions.server";
import { getSession } from "./actions/session";

export const orpcRouter = {
  session: {
    getSession,
  },
  demo: {
    todo: {
      getTodos,
      addTodo,
      removeTodo,
      toggleCompleted,
    },
  },
};

export type OrpcRouter = typeof orpcRouter;
