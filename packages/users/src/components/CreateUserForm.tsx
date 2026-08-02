import { type FormEvent, useState } from "react";
import { Field, Button } from "@repo/shared";
import { useCreateUser } from "../hooks";
import { createUserSchema } from "../validation";

const CreateUserForm = ({
  onSuccess,
}: {
  onSuccess?: (username: string) => void;
}) => {
  const [username, setUsername] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const createUserMutation = useCreateUser();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setValidationErrors({});

    const formResult = createUserSchema.safeParse({ username });

    if (!formResult.success) {
      const errors: Record<string, string> = {};
      formResult.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    try {
      const user = await createUserMutation.mutateAsync({
        username: formResult.data.username,
      });
      setUsername("");
      setValidationErrors({});
      onSuccess?.(user.id);
    } catch (error) {
      // Error is handled by mutation state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field
        id="username"
        label="Username"
        hint="Enter a unique username for the new user."
        error={validationErrors.username}
      >
        {(props) => (
          <input
            {...props}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (validationErrors.username) {
                setValidationErrors({});
              }
              if (createUserMutation.error) {
                createUserMutation.reset();
              }
            }}
            placeholder="Username"
            autoComplete="off"
          />
        )}
      </Field>
      <div>
        <Button type="submit" disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </Button>
        {createUserMutation.isError && (
          <p className="mt-2 text-xs text-destructive">
            {createUserMutation.error instanceof Error
              ? createUserMutation.error.message
              : "Failed to create user"}
          </p>
        )}
      </div>
    </form>
  );
};

export { CreateUserForm };
