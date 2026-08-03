import type { ToDoItem, ToDoStatus } from "@repo/shared";

interface TodoListProps {
  todos: ToDoItem[];
  isUpdating: boolean;
  updateTodoId?: string;
  onToggle: (id: string, status: ToDoStatus) => void;
}

const TodoList = ({
  todos,
  onToggle,
  isUpdating,
  updateTodoId,
}: TodoListProps) => {
  return (
    <ul className="divide-y divide-border rounded-md border border-border">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex flex-col gap-2 px-4 py-3 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.status === "done"}
              disabled={isUpdating && updateTodoId === todo.id}
              onChange={() =>
                onToggle(todo.id, todo.status === "done" ? "pending" : "done")
              }
              className="size-4 accent-primary"
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`flex-1 cursor-pointer text-sm ${
                todo.status === "done"
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {todo.title}
            </label>
            {isUpdating && updateTodoId === todo.id && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                updating...
              </span>
            )}
          </div>
          {todo.description && (
            <p className="ml-7 text-xs text-muted-foreground">
              {todo.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export { TodoList };
