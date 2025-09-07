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
      <HeadMeta title="Error Handling" description="Error Handling Demo" />
      <CardHeader>
        <CardTitle>Error Handling</CardTitle>
        <CardDescription>Error Handling Demo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="">
          This text is rendered on{" "}
          <span className="font-bold text-primary">
            {isServer() ? "Server" : "Client"}
          </span>
          , and will cause a{" "}
          <span className="font-bold text-destructive">hydration error</span>{" "}
          when you refresh the page.
        </p>
        <Separator />
        <p>Errors are handled by default, try this now:</p>
        <div className="flex flex-row gap-4">
          <Button
            onClick={() => {
              throw new Error("test");
            }}
          >
            Throw a callback error
          </Button>
          <Button
            onClick={() => {
              setError(true);
            }}
          >
            Throw a render error
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
