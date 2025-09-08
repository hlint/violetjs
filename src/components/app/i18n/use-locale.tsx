import { match } from "@formatjs/intl-localematcher";
import type { I18n } from "@lingui/core";
import {
  detect,
  fromNavigator,
  fromStorage,
  fromUrl,
} from "@lingui/detect-locale";
import { useLingui } from "@lingui/react";
import { createContext, useContext, useLayoutEffect, useState } from "react";
import { locales } from "./defines";

const LOCALE_STORAGE_KEY = "violet-ui-lang";

const Context = createContext<{
  i18n: I18n;
  locale: string;
  setLocale: (locale: string) => void;
}>({} as any);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("en");
  const { i18n } = useLingui();
  useLayoutEffect(() => {
    const userLocales = detect(
      fromUrl("lang"),
      fromStorage(LOCALE_STORAGE_KEY),
      fromNavigator(),
      () => "en",
    );
    if (userLocales) {
      const matched = match(
        [userLocales],
        locales.map((locale) => locale.code),
        "en",
      );
      setLocale(matched);
    }
  }, []);
  useLayoutEffect(() => {
    i18n.activate(locale);
  }, [locale, i18n]);
  return (
    <Context.Provider
      value={{
        i18n,
        locale,
        setLocale: (locale) => {
          setLocale(locale);
          localStorage.setItem(LOCALE_STORAGE_KEY, locale);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useLocale() {
  return useContext(Context);
}
