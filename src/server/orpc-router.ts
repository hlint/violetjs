import {
  addPost,
  getPost,
  getPosts,
  removePost,
  updatePost,
} from "@/pages/demo/post/actions.server";
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
    post: {
      getPost,
      getPosts,
      addPost,
      removePost,
      updatePost,
    },
    todo: {
      getTodos,
      addTodo,
      removeTodo,
      toggleCompleted,
    },
  },
};

export type OrpcRouter = typeof orpcRouter;
