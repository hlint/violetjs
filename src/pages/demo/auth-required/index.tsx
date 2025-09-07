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
      <HeadMeta title="Auth Required" description="Auth Required Demo" />
      <CardHeader>
        <CardTitle>Auth Required</CardTitle>
        <CardDescription>This page is protected by auth guard</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          You are <b className="text-primary">logged in</b>.
        </p>
      </CardContent>
    </Card>
  );
}
