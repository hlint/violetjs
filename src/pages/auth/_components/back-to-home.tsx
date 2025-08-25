import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function BackToHome() {
  return (
    <Button variant="outline" className="w-full" type="button" asChild>
      <Link to="/">Back to Home</Link>
    </Button>
  );
}
