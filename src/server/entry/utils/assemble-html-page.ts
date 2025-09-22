import type { HelmetDataContext } from "@dr.pogodin/react-helmet";

export function assembleHtmlPage({
  template,
  rendered,
  ssrData,
  helmetContext,
  lang,
}: {
  template: string;
  rendered: string;
  ssrData: any;
  helmetContext: HelmetDataContext;
  lang: string;
}) {
  return template
    .replace(`--app-lang--`, lang)
    .replace(`<!--app-head-->`, getHead(helmetContext))
    .replace(
      `<!--app-html-->`,
      rendered +
        `<script>window.__SSR_DATA__=${JSON.stringify(ssrData)}</script>`,
    );
}

function getHead(helmetContext: HelmetDataContext) {
  const helmet = helmetContext.helmet;
  return [
    helmet?.title?.toString(),
    helmet?.priority?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
    helmet?.style?.toString(),
    helmet?.noscript?.toString(),
    helmet?.base?.toString(),
  ]
    .filter(Boolean)
    .join("\n");
}
