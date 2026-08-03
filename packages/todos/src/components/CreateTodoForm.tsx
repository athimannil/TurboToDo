import { useState, type FormEvent } from "react";
import { useCreateTodo } from "../hooks";
import { createTodoSchema } from "../validation";
import { Field, Button } from "@repo/shared";
import { useUsers } from "@repo/users";

interface CreateTodoFormProps {
  selectedUserId: string | null;
  setSelectedUserId: (userId: string | null) => void;
}

const CreateTodoForm = ({
  selectedUserId,
  setSelectedUserId,
}: CreateTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({});
  const { data: users } = useUsers();

  const createTodoMutation = useCreateTodo();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setValidationError({});

    const result = createTodoSchema.safeParse({
      userId: selectedUserId,
      title,
      description: description || undefined,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationError(errors);
      return;
    }

    try {
      await createTodoMutation.mutateAsync(result.data);
      setTitle("");
      setDescription("");
      setValidationError({});
    } catch (error) {
      // Error is handled by mutation state
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field id="todo-assignee" label="Assignee" error={validationError.userId}>
        {(props) => (
          <select
            {...props}
            name="todo-assignee"
            aria-describedby="user-description"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive"
            value={selectedUserId || ""}
            onChange={(event) => setSelectedUserId(event.target.value || null)}
          >
            <option value="">All users</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field id="title" label="Title" error={validationError.title}>
        {(props) => (
          <input
            {...props}
            name="title"
            type="text"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
          />
        )}
      </Field>

      <Field
        id="description"
        label="Description (Optional)"
        error={validationError.description}
      >
        {(props) => (
          <textarea
            {...props}
            name="description"
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive min-h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
          />
        )}
      </Field>
      <div>
        <Button type="submit" disabled={createTodoMutation.isPending}>
          {createTodoMutation.isPending ? "Adding..." : "Add todo"}
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          The item appears in the list immediately and rolls back if the request
          fails.
        </p>
        {createTodoMutation.isError && (
          <p className="text-xs text-destructive">
            {createTodoMutation.error?.message || "Failed to create todo"}
          </p>
        )}
      </div>
    </form>
  );
};

export { CreateTodoForm };
