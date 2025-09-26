import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import z from "zod";
import AppLink, { useAppNavigate } from "@/components/app/app-link";
import ClientOnly from "@/components/app/client-only";
import HeadMeta from "@/components/app/head-meta";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { orpc } from "@/lib/orpc-client";
import { cn } from "@/lib/utils";

export default function PostListPage() {
  const { i18n } = useLingui();
  const {
    data: posts,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/demo/post/list", orpc.demo.post.getPosts);
  if (!posts) {
    return null;
  }
  const handleRemovePost = (id: number) => {
    mutate(orpc.demo.post.removePost({ id }).then(), {
      optimisticData: posts.filter((t) => t.id !== id),
      populateCache: false,
      revalidate: false,
    });
  };
  return (
    <Card className="w-2xl" magic>
      <HeadMeta title={t`Todo`} />
      <CardHeader>
        <CardTitle>
          <Trans>Posts</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>
            Showcasing CRUD operations with oRPC APIs and SWR data fetching
            support.
          </Trans>
        </CardDescription>
        <CardAction>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => mutate()}
            className={cn(isLoading && "animate-spin")}
            disabled={isLoading || isValidating}
          >
            <RefreshCcwIcon className="w-4 h-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className={cn(isLoading && "_opacity-50")}>
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center gap-2 hover:bg-muted/35 rounded-md py-1 px-3"
            >
              <AppLink
                className="hover:underline flex-1"
                to={`../post/${post.id}`}
              >
                {post.title}
              </AppLink>
              <ClientOnly>
                <span className="text-sm text-muted-foreground">
                  {i18n.date(new Date(post.createdAt), {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </span>
              </ClientOnly>
              <Button
                size="icon"
                variant="ghost"
                className="hover-show ml-auto"
                onClick={() => handleRemovePost(post.id)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <FormAddPost />
      </CardFooter>
    </Card>
  );
}

function FormAddPost() {
  const form = useForm({
    resolver: zodResolver(z.object({ title: z.string().min(1) })),
  });
  const appNavigate = useAppNavigate();
  const handleAddPost = async (title: string) => {
    const { id } = await orpc.demo.post.addPost({ title });
    appNavigate(`../post/${id}`);
  };
  return (
    <form
      className="flex items-center gap-4 w-full"
      onSubmit={form.handleSubmit(async (data) => {
        await handleAddPost(data.title);
        form.reset();
      })}
    >
      <Input
        {...form.register("title")}
        type="text"
        placeholder="Add a new post"
        className="flex-1"
        autoFocus
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        <Trans>Add</Trans>
      </Button>
    </form>
  );
}
