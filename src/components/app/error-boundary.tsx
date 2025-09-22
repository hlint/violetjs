import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error-fallback";

export default function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
}
