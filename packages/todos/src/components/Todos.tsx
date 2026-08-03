import { useMemo, useState } from "react";
import { useTodos, useToggleTodoStatus } from "../hooks";
import type { ToDoStatus } from "@repo/shared";
import { TodoList } from "./TodoList";
import { Button, Spinner } from "@repo/shared";

interface TodosProps {
  userId?: string | null;
}

const Todos = ({ userId }: TodosProps = {}) => {
  const [status, setStatus] = useState<"All" | "Pending" | "Done">("All");
  const filterButtons = ["All", "Pending", "Done"];

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useTodos(userId || undefined);

  const toggleMutation = useToggleTodoStatus();

  const handleToggleTodoStatus = (todoId: string, status: ToDoStatus) => {
    toggleMutation.mutate({ todoId, status });
  };

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    return todos.filter((todo) => {
      if (status === "All") return true;
      if (status === "Pending") return todo.status === "pending";
      if (status === "Done") return todo.status === "done";
      return true;
    });
  }, [todos, status]);

  if (isLoading) {
    return <Spinner label="Loading todos..." />;
  }

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          {error?.message || "Error loading todos. Please try again later."}
        </p>
      </div>
    );
  }

  if (!todos || todos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No todos yet. Create one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col ">
      <div
        className="mb-4 flex items-center gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {filterButtons.map((value) => (
          <Button
            key={value}
            variant={status === value ? "primary" : "outline"}
            className="px-3 py-1 text-xs capitalize"
            aria-pressed={status === value}
            onClick={() => setStatus(value as "All" | "Pending" | "Done")}
          >
            {value}
          </Button>
        ))}
      </div>
      {filteredTodos && filteredTodos.length > 0 ? (
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodoStatus}
          isUpdating={toggleMutation.isPending}
          updateTodoId={toggleMutation.variables?.todoId}
        />
      ) : (
        <p className="text-foreground">No todos.</p>
      )}
    </div>
  );
};

export { Todos };
