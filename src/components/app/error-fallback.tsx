import type { FallbackProps } from "react-error-boundary";
import { Button } from "../ui/button";

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="prose p-4">
      <h1>:(</h1>
      <h3>Oops, something went wrong...</h3>
      <p>Please try again later or click the button below to reset.</p>
      <Button onClick={resetErrorBoundary}>Reset</Button>
    </div>
  );
}
