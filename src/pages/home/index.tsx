import { t } from "@lingui/core/macro";
import HeadMeta from "@/components/app/head-meta";
import { useLocale } from "@/components/app/i18n/use-locale";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import README from "../../../README.md?raw";
import README_zh_CN from "../../../README.zh-CN.md?raw";

export default function HomePage() {
  const { locale } = useLocale();
  const text = locale === "zh-CN" ? README_zh_CN : README;
  return (
    <div>
      <HeadMeta title={t`Home`} />
      <div className="p-4 py-8 max-w-4xl mx-auto">
        <MarkdownPreview
          text={text.replace(
            "[![banner](/public/banner.png)]",
            "[![banner](/banner.png)]",
          )}
        />
      </div>
    </div>
  );
}
