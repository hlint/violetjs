import "./index.css";
import {
  type HelmetDataContext,
  HelmetProvider,
} from "@dr.pogodin/react-helmet";
import { useRoutes } from "react-router";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";
import AppErrorBoundary from "./components/app/error-boundary";
import ErrorNotifier from "./components/app/error-notifier";
import { Hreflangs } from "./components/app/i18n/hreflangs";
import { I18nAppProvider } from "./components/app/i18n/i18n";
import { ThemeEffects } from "./components/app/theme/theme-effects";
import { SessionProvider } from "./hooks/use-session";
import { getSsrData } from "./lib/ssr-data";
import { clientRoutes } from "./routes-client";
import { RootStoreProvider } from "./store/_root";

export default function App({
  helmetContext,
}: {
  helmetContext?: HelmetDataContext;
}) {
  const routes = useRoutes(clientRoutes);
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
                <Hreflangs />
                {routes}
              </HelmetProvider>
            </SessionProvider>
          </RootStoreProvider>
        </SWRConfig>
      </AppErrorBoundary>
    </I18nAppProvider>
  );
}
