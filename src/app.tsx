import "./index.css";
import {
  type HelmetDataContext,
  HelmetProvider,
} from "@dr.pogodin/react-helmet";
import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";
import ClientOnly from "./components/app/client-only";
import AppErrorBoundary from "./components/app/error-boundary";
import ErrorNotifier from "./components/app/error-notifier";
import { DEFAULT_LANG, langs } from "./components/app/i18n/defines";
import { I18nAppProvider } from "./components/app/i18n/i18n";
import { ThemeEffects } from "./components/app/theme/theme-effects";
import { SessionProvider } from "./hooks/use-session";
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RootLayout from "./layouts/root-layout";
import SignInGuard from "./layouts/sign-in-guard";
import { getSsrData } from "./lib/ssr-data";
import NotFoundPage from "./pages/404";
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
  const appRoutes = (
    <>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-out" element={<SignOutPage />} />
      </Route>
      <Route path="*" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="demo">
          <Route path="todo" element={<TodoPage />} />
          <Route path="auth-required" element={<SignInGuard />}>
            <Route index element={<AuthRequiredPage />} />
          </Route>
          <Route path="error-handling" element={<ErrorHandlingPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  );
  return (
    <I18nAppProvider>
      <AppErrorBoundary>
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
                <ThemeEffects />
                <Routes>
                  {langs.map((locale) => (
                    <Route
                      key={locale}
                      path={`/${locale}`}
                      element={<RootLayout />}
                    >
                      {appRoutes}
                    </Route>
                  ))}
                  <Route
                    path="*"
                    element={
                      <>
                        <ClientOnly>
                          <Navigate to={`/${DEFAULT_LANG}`} />
                        </ClientOnly>
                        <NotFoundPage />
                      </>
                    }
                  />
                </Routes>
              </HelmetProvider>
            </SessionProvider>
          </RootStoreProvider>
        </SWRConfig>
      </AppErrorBoundary>
    </I18nAppProvider>
  );
}
