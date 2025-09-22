import { Helmet } from "@dr.pogodin/react-helmet";
import { DEFAULT_LANG, langs } from "./defines";
import { useLocale } from "./use-locale";

export function Hreflangs() {
  const { path } = useLocale();
  return (
    <Helmet>
      <link
        rel="alternate"
        href={`/${DEFAULT_LANG}${path}`}
        hrefLang="x-default"
      />
      {langs.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          href={`/${lang}${path}`}
          hrefLang={lang}
        />
      ))}
    </Helmet>
  );
}
