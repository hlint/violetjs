import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import HeadMeta from "@/components/app/head-meta";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { isServer } from "@/lib/utils";

export default function ErrorHandlingPage() {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error("test");
  }
  return (
    <Card className="w-2xl" magic>
      <HeadMeta title={t`Error Handling`} />
      <CardHeader>
        <CardTitle>
          <Trans>Error Handling</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>Error Handling Demo</Trans>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="">
          <Trans>
            This text is rendered on{" "}
            <span className="font-bold text-primary">
              {isServer() ? "Server" : "Client"}
            </span>
            , and will cause a{" "}
            <span className="font-bold text-destructive">hydration error</span>{" "}
            when you refresh the page.
          </Trans>
        </p>
        <Separator />
        <p>
          <Trans>Errors are handled by default, try this now:</Trans>
        </p>
        <div className="flex flex-row gap-4">
          {/* A toaster will be shown in development */}
          {import.meta.env.DEV && (
            <Button
              onClick={() => {
                throw new Error("test");
              }}
            >
              <Trans>Throw a callback error</Trans>
            </Button>
          )}
          <Button
            onClick={() => {
              setError(true);
            }}
          >
            <Trans>Throw a render error</Trans>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
