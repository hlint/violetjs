import { Trans } from "@lingui/react/macro";
import HeadMeta from "@/components/app/head-meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToHome from "../_components/back-to-home";
import CsrfInput, { useCsrfToken } from "../_components/csrf-input";

export default function SignOutPage() {
  const csrfToken = useCsrfToken();
  return (
    <Card className="min-w-sm">
      <HeadMeta title="Sign Out" description="Sign Out of your account" />
      <CardHeader>
        <CardTitle>
          <Trans>Sign Out</Trans>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          <Trans>Are you sure you want to sign out?</Trans>
        </p>
        <form action="/auth/signout" method="post">
          <CsrfInput csrfToken={csrfToken} />
          <Button variant="default" className="w-full" type="submit">
            <Trans>Sign Out</Trans>
          </Button>
        </form>
        <BackToHome />
      </CardContent>
    </Card>
  );
}
