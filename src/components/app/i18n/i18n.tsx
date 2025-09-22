import { i18n, type Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { getSsrData } from "@/lib/ssr-data";
import { messages as enMessages } from "@/locales/en";
import { messages as zhCNMessages } from "@/locales/zh-CN";
import { DEFAULT_LANG, type langs } from "./defines";
import { LocaleProvider } from "./use-locale";

i18n.load({
  en: enMessages,
  "zh-CN": zhCNMessages,
} satisfies Record<(typeof langs)[number], Messages>);

i18n.activate(getSsrData()?.lang || DEFAULT_LANG);

export function I18nAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider i18n={i18n}>
      <LocaleProvider>{children}</LocaleProvider>
    </I18nProvider>
  );
}
