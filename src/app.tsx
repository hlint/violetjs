import "./index.css";
import {
  type HelmetDataContext,
  HelmetProvider,
} from "@dr.pogodin/react-helmet";
import { Route, Routes } from "react-router";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RootLayout from "./layouts/root-layout";
import SignInGuard from "./layouts/sign-in-guard";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import SignInPage from "./pages/auth/sign-in";
import SignOutPage from "./pages/auth/sign-out";
import AuthRequiredPage from "./pages/demo/auth-required";
import TodoPage from "./pages/demo/todo";
import HomePage from "./pages/home";
import { RootStoreProvider } from "./store/_root";

export default function App({
  helmetContext,
}: {
  helmetContext?: HelmetDataContext;
}) {
  return (
    <RootStoreProvider>
      <HelmetProvider context={helmetContext}>
        <Routes>
          <Route path="*" element={<RootLayout />}>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-out" element={<SignOutPage />} />
            </Route>
            <Route path="*" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="demo">
                <Route path="todo" element={<TodoPage />} />
                <Route path="auth-required" element={<SignInGuard />}>
                  <Route index element={<AuthRequiredPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </HelmetProvider>
    </RootStoreProvider>
  );
}
