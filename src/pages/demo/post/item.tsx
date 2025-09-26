import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { RefreshCcwIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import z from "zod";
import { useAppNavigate } from "@/components/app/app-link";
import ClientOnly from "@/components/app/client-only";
import HeadMeta from "@/components/app/head-meta";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import type { DemoPost } from "@/db/schema";
import { orpc } from "@/lib/orpc-client";
import { cn } from "@/lib/utils";

export default function PostItemPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const {
    data: post,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(`/demo/post/${postId}`, () =>
    orpc.demo.post.getPost({ id: postId }),
  );
  if (post === undefined) {
    return (
      <Card className="w-2xl" magic>
        <HeadMeta title={t`Loading...`} />
        <CardHeader>
          <Skeleton className="w-full h-8" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-40" />
        </CardContent>
      </Card>
    );
  }
  if (post === null) {
    return (
      <Card className="w-2xl" magic>
        <HeadMeta title={t`Post Not Found`} />
        <CardHeader>
          <CardTitle>
            <Trans>Post Not Found</Trans>
          </CardTitle>
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
        <CardContent className="flex flex-col gap-4">
          <Trans>The post you are looking for does not exist.</Trans>
          <Button asChild variant="default" className="w-fit">
            <Link to="../post/list">
              <Trans>Back to list</Trans>
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-2xl" magic>
      <HeadMeta title={post.title} />
      <CardHeader>
        <CardTitle>
          <Trans>Post Detail</Trans>
        </CardTitle>
        <CardDescription>
          <Trans>Complex form with react-hook-form and ISR support.</Trans>
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
        <FormUpdatePost post={post} />
      </CardContent>
    </Card>
  );
}

function FormUpdatePost({ post }: { post: DemoPost }) {
  const { mutate } = useSWRConfig();
  const form = useForm({
    resolver: zodResolver(
      z.object({ title: z.string().min(1), content: z.string().min(0) }),
    ),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });
  const appNavigate = useAppNavigate();
  const handleUpdatePost = async (data: { title: string; content: string }) => {
    await orpc.demo.post.updatePost({
      id: post.id,
      title: data.title,
      content: data.content,
    });
    toast.success(t`Post updated`);
    mutate(`/demo/post/${post.id}`);
  };
  const handleRemovePost = async (id: number) => {
    await orpc.demo.post.removePost({ id });
    mutate(`/demo/post/${post.id}`, null, { revalidate: false });
    appNavigate("../post/list");
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={form.handleSubmit(async (data) => {
          await handleUpdatePost(data);
        })}
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Title</Trans>
              </FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>Title of the post</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Trans>Content</Trans>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                <Trans>Content of the post</Trans>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <ClientOnly>
          <span className="text-sm text-muted-foreground">
            <Trans>Created at</Trans>{" "}
            {i18n.date(new Date(post.createdAt), {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </ClientOnly>
        <div className="flex gap-4">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            <Trans>Update</Trans>
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleRemovePost(post.id)}
          >
            <Trans>Delete</Trans>
          </Button>
          <Button asChild variant="outline" className="ml-auto">
            <Link to="../post/list">
              <Trans>Back to list</Trans>
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
