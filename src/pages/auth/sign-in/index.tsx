import { Trans } from "@lingui/react/macro";
import HeadMeta from "@/components/app/head-meta";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackToHome from "../_components/back-to-home";
import CsrfInput, { useCsrfToken } from "../_components/csrf-input";

export default function SignInPage() {
  const csrfToken = useCsrfToken();
  return (
    <Card className="min-w-sm">
      <HeadMeta title="Sign In" description="Sign In to your account" />
      <CardHeader>
        <CardTitle>
          <Trans>Sign In</Trans>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          <Trans>Sign in to your account to continue.</Trans>
        </p>
        <form action="/auth/signin/github" method="post">
          <CsrfInput csrfToken={csrfToken} />
          <Button variant="outline" className="w-full" type="submit">
            <Avatar className="size-5">
              <AvatarImage src="https://authjs.dev/img/providers/github.svg" />
            </Avatar>
            <Trans>Continue with GitHub</Trans>
          </Button>
        </form>
        <Button variant="outline" className="w-full" type="button" disabled>
          <Avatar className="size-5">
            <AvatarImage src="https://authjs.dev/img/providers/google.svg" />
          </Avatar>
          <Trans>Continue with Google</Trans>
        </Button>
        <BackToHome />
      </CardContent>
    </Card>
  );
}
