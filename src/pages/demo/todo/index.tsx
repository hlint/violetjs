import { RefreshCcwIcon, TrashIcon } from "lucide-react";
import useSWR, { useSWRConfig } from "swr";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { DemoTodo } from "@/db/schema";
import { orpc } from "@/lib/orpc-client";
import { cn } from "@/lib/utils";

const title = "Todo";
const description = "A simple todo demo with ssr, orpc, drizzle, and zustand.";

export default function TodoPage() {
  const {
    data: todos,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("todos", orpc.demo.todo.getTodos);
  if (!todos) {
    return null;
  }
  const handleRemoveTodo = (id: number) => {
    const optimisticData = todos.filter((t) => t.id !== id);
    mutate(
      async () => {
        await orpc.demo.todo.removeTodo({ id });
        return optimisticData;
      },
      { optimisticData, revalidate: false }
    );
  };
  const handleToggleCompleted = (id: number) => {
    const optimisticData = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    mutate(
      async () => {
        await orpc.demo.todo.toggleCompleted({ id });
        return optimisticData;
      },
      { optimisticData, revalidate: false }
    );
  };
  return (
    <Card className="w-2xl">
      <HeadMeta title={title} description={description} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
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
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 hover:bg-muted/35 rounded-md py-1 px-3"
            >
              <Checkbox
                className="cursor-pointer"
                checked={todo.completed}
                onCheckedChange={() => handleToggleCompleted(todo.id)}
              />
              <button
                type="button"
                className={cn(
                  "cursor-pointer",
                  todo.completed && "line-through"
                )}
                onClick={() => handleToggleCompleted(todo.id)}
              >
                {todo.title}
              </button>
              <Button
                size="icon"
                variant="ghost"
                className="hover-show ml-auto"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <FormAddTodo todos={todos} />
      </CardFooter>
    </Card>
  );
}

function FormAddTodo({ todos }: { todos: DemoTodo[] }) {
  const { mutate } = useSWRConfig();
  const handleAddTodo = (title: string) => {
    const optimisticData = [
      ...todos,
      {
        id: Math.max(...todos.map((t) => t.id)) + 1,
        title: `* ${title}`,
        completed: false,
      },
    ];
    mutate(
      "todos",
      async () => {
        await orpc.demo.todo.addTodo({ title });
        return optimisticData;
      },
      {
        optimisticData,
      }
    );
  };
  return (
    <form
      className="flex items-center gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get("title") as string;
        if (!title) return;
        handleAddTodo(title);
        (e.target as HTMLFormElement).reset();
      }}
    >
      <Input
        type="text"
        placeholder="Add a new todo"
        name="title"
        className="flex-1"
        required
        autoFocus
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
