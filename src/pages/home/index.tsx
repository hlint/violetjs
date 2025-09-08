import { t } from "@lingui/core/macro";
import HeadMeta from "@/components/app/head-meta";
import MarkdownPreview from "@/components/markdown/markdown-preview";
import README from "../../../README.md?raw";

export default function HomePage() {
  return (
    <div>
      <HeadMeta title={t`Home`} />
      <div className="p-4 py-8 max-w-4xl mx-auto">
        <MarkdownPreview
          text={README.replace(
            "[![banner](/public/banner.png)]",
            "[![banner](/banner.png)]",
          )}
        />
      </div>
    </div>
  );
}
