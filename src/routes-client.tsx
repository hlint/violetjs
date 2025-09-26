import type { RouteObject } from "react-router";
import { langs } from "./components/app/i18n/defines";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RootLayout from "./layouts/root-layout";
import SignInGuard from "./layouts/sign-in-guard";
import NotFoundPage from "./pages/404";
import SignInPage from "./pages/auth/sign-in";
import SignOutPage from "./pages/auth/sign-out";
import AuthRequiredPage from "./pages/demo/auth-required";
import ErrorHandlingPage from "./pages/demo/error-handling";
import PostItemPage from "./pages/demo/post/item";
import PostListPage from "./pages/demo/post/list";
import TodoPage from "./pages/demo/todo";
import HomePage from "./pages/home";

export const clientRoutes: RouteObject[] = [
  ...langs.map((lang) => ({
    path: lang,
    Component: RootLayout,
    children: [
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "sign-in", Component: SignInPage },
          { path: "sign-out", Component: SignOutPage },
          { path: "*", Component: NotFoundPage },
        ],
      },
      {
        path: "*",
        Component: AppLayout,
        children: [
          { index: true, Component: HomePage },
          {
            path: "demo",
            children: [
              { path: "error-handling", Component: ErrorHandlingPage },
              { path: "todo", Component: TodoPage },
              { path: "post/list", Component: PostListPage },
              { path: "post/:id", Component: PostItemPage },
              {
                path: "auth-required",
                Component: SignInGuard,
                children: [{ index: true, Component: AuthRequiredPage }],
              },
              { path: "*", Component: NotFoundPage },
            ],
          },
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  })),
  {
    path: "*",
    Component: NotFoundPage,
  },
];
