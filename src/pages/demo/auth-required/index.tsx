import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import HeadMeta from "@/components/app/head-meta";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthRequiredPage() {
  return (
    <Card className="w-2xl" magic>
      <HeadMeta title={t`Auth Required`} />
      <CardHeader>
        <CardTitle>
          <Trans>Auth Required</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>This page is protected by auth guard</Trans>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          <Trans>
            You are <b className="text-primary">logged in</b>.
          </Trans>
        </p>
      </CardContent>
    </Card>
  );
}
