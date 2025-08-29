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

export default function ErrorHandlingPage() {
  const [error, setError] = useState(false);
  if (error) {
    throw new Error("test");
  }
  return (
    <Card className="w-2xl">
      <HeadMeta title="Error Handling" description="Error Handling Demo" />
      <CardHeader>
        <CardTitle>Error Handling</CardTitle>
        <CardDescription>Error Handling Demo</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="">
          This text is rendered on{" "}
          <span className="font-bold">
            {typeof window === "undefined" ? "Server" : "Client"}
          </span>
          , and will cause a hydration error.
        </p>
        <div className="flex flex-row gap-2">
          <Button
            onClick={() => {
              throw new Error("test");
            }}
          >
            Callback Error
          </Button>
          <Button
            onClick={() => {
              setError(true);
            }}
          >
            Runtime Error
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
