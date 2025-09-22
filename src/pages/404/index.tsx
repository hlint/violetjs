import { Trans } from "@lingui/react/macro";
import AppLink from "@/components/app/app-link";

export default function NotFoundPage() {
  return (
    <div role="alert" className="prose p-4">
      <h2>
        <Trans>404 Not Found</Trans>
      </h2>
      <p>
        <Trans>
          The page you are looking for does not exist. Please try again later or
          click{" "}
          <AppLink to="/" className="mx-1 text-primary">
            here
          </AppLink>{" "}
          to go back to the home page.
        </Trans>
      </p>
    </div>
  );
}
