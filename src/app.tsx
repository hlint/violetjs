import "./index.css";
import {
  type HelmetDataContext,
  HelmetProvider,
} from "@dr.pogodin/react-helmet";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";
import ErrorFallback from "./components/app/error-fallback";
import ErrorNotifier from "./components/app/error-notifier";
import { ThemeWatcher } from "./components/app/theme/theme-watcher";
import { SessionProvider } from "./hooks/use-session";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RootLayout from "./layouts/root-layout";
import SignInGuard from "./layouts/sign-in-guard";
import { getSsrData } from "./lib/ssr-data";
import NotFoundPage from "./pages/404";
import AboutPage from "./pages/about";
import SignInPage from "./pages/auth/sign-in";
import SignOutPage from "./pages/auth/sign-out";
import AuthRequiredPage from "./pages/demo/auth-required";
import ErrorHandlingPage from "./pages/demo/error-handling";
import TodoPage from "./pages/demo/todo";
import HomePage from "./pages/home";
import { RootStoreProvider } from "./store/_root";

export default function App({
  helmetContext,
}: {
  helmetContext?: HelmetDataContext;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Toaster position="top-center" />
      <ErrorNotifier />
      <SWRConfig
        value={{
          fallback: getSsrData()?.swrFallback,
        }}
      >
        <RootStoreProvider>
          <SessionProvider>
            <HelmetProvider context={helmetContext}>
              <ThemeWatcher />
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
                      <Route
                        path="error-handling"
                        element={<ErrorHandlingPage />}
                      />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Route>
              </Routes>
            </HelmetProvider>
          </SessionProvider>
        </RootStoreProvider>
      </SWRConfig>
    </ErrorBoundary>
  );
}
