import { Trans } from "@lingui/react/macro";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function BackToHome() {
  return (
    <Button variant="outline" className="w-full" type="button" asChild>
      <Link to="/">
        <Trans>Back to Home</Trans>
      </Link>
    </Button>
  );
}
