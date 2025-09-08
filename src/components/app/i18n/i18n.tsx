import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { messages as enMessages } from "@/locales/en";
import { messages as zhCNMessages } from "@/locales/zh-CN";
import { LocaleProvider } from "./use-locale";

const defaultLocale = "en";

i18n.load({
  en: enMessages,
  "zh-CN": zhCNMessages,
});
i18n.activate(defaultLocale);

export function I18nAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider i18n={i18n}>
      <LocaleProvider>{children}</LocaleProvider>
    </I18nProvider>
  );
}
