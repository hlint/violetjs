import { i18n } from "@lingui/core";
import Cookies from "js-cookie";
import { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { parseLangFromUrl } from "./utils";

export interface LocaleData {
  locale: string;
  path: string;
}
const Context = createContext<LocaleData>(null as any);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const localeData = useMemo(() => {
    const lang = parseLangFromUrl(pathname);
    const pathnameFixed = pathname.startsWith(`/${lang}`)
      ? pathname.replace(`/${lang}`, "")
      : pathname;
    return {
      locale: lang,
      path: [pathnameFixed, search, hash].join(""),
    };
  }, [pathname, search, hash]);
  const { locale } = localeData;
  useLayoutEffect(() => {
    i18n.activate(locale);
    document.documentElement.lang = locale;
    Cookies.set("violet-ui-lang", locale);
  }, [locale]);
  return <Context.Provider value={localeData}>{children}</Context.Provider>;
}

export function useLocale() {
  return useContext(Context);
}
