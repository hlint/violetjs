import { Helmet } from "@dr.pogodin/react-helmet";

export default function HeadMeta({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
