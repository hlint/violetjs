import { i18n } from "@lingui/core";
import Cookies from "js-cookie";
import { createContext, useContext, useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { parseLangFromUrl } from "./utils";

export interface LocaleData {
  lang: string;
  fullpath: string;
  mainpath: string;
}
const Context = createContext<LocaleData>(null as any);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { pathname, search, hash } = useLocation();
  const localeData = useMemo(() => {
    const lang = parseLangFromUrl(pathname);
    const mainpath = pathname.replace(/^\/[^/]+/, "");
    return {
      lang,
      mainpath,
      fullpath: [mainpath, search, hash].join(""),
    };
  }, [pathname, search, hash]);
  const { lang } = localeData;
  useLayoutEffect(() => {
    i18n.activate(lang);
    document.documentElement.lang = lang;
    Cookies.set("violet-ui-lang", lang);
  }, [lang]);
  return <Context.Provider value={localeData}>{children}</Context.Provider>;
}

export function useLocale() {
  return useContext(Context);
}
