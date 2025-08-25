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
    <Card className="w-2xl">
      <HeadMeta title="Auth Required" description="Auth Required Demo" />
      <CardHeader>
        <CardTitle>Auth Required</CardTitle>
        <CardDescription>This page is protected by auth guard</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You are logged in.</p>
      </CardContent>
    </Card>
  );
}
