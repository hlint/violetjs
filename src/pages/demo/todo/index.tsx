import { RefreshCcwIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";
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
import { cn } from "@/lib/utils";
import { useDemoTodoStore } from "@/store/_root";

const title = "Todo";
const description = "A simple todo demo with ssr, orpc, drizzle, and zustand.";

export default function TodoPage() {
  const isInitialized = useDemoTodoStore((s) => s.isInitialized);
  const isLoading = useDemoTodoStore((s) => s.isLoading);
  const todos = useDemoTodoStore((s) => s.items);
  const initialize = useDemoTodoStore((s) => s.initialize);
  const refresh = useDemoTodoStore((s) => s.refresh);
  const toggleCompleted = useDemoTodoStore((s) => s.toggleCompleted);
  const removeTodo = useDemoTodoStore((s) => s.removeTodo);
  const addTodo = useDemoTodoStore((s) => s.addTodo);
  useEffect(() => {
    initialize();
  }, [initialize]);
  if (!isInitialized) {
    return null;
  }
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
            onClick={() => refresh()}
            className={cn(isLoading && "animate-spin")}
            disabled={isLoading}
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
                onCheckedChange={() => toggleCompleted(todo.id)}
              />
              <button
                type="button"
                className={cn(
                  "cursor-pointer",
                  todo.completed && "line-through",
                )}
                onClick={() => toggleCompleted(todo.id)}
              >
                {todo.title}
              </button>
              <Button
                size="icon"
                variant="ghost"
                className="hover-show ml-auto"
                onClick={() => removeTodo(todo.id)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form
          className="flex items-center gap-4 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const title = formData.get("title") as string;
            if (!title) return;
            addTodo({ title });
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
      </CardFooter>
    </Card>
  );
}
