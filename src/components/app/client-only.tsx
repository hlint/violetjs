import { isServer } from "@/lib/utils";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  if (isServer()) {
    return null;
  }
  return children;
}
