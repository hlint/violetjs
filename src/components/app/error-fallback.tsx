import { Trans } from "@lingui/react/macro";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="prose p-4">
      <h1>:(</h1>
      <h3>
        <Trans>Oops, something went wrong...</Trans>
      </h3>
      <p>
        <Trans>
          Please try again later or click{" "}
          <button
            type="button"
            className="mx-1 text-primary underline cursor-pointer"
            onClick={resetErrorBoundary}
          >
            here
          </button>{" "}
          to reset.
        </Trans>
      </p>
    </div>
  );
}
