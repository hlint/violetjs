import { Trans } from "@lingui/react/macro";
import AppLink from "@/components/app/app-link";
import { Button } from "@/components/ui/button";

export default function BackToHome() {
  return (
    <Button
      variant="outline"
      className="w-full no-underline"
      type="button"
      asChild
    >
      <AppLink to="/">
        <Trans>Back to Home</Trans>
      </AppLink>
    </Button>
  );
}
