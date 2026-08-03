import { Link } from "@tanstack/react-router";
import { Spinner } from "@repo/shared";
import { useUsers } from "../hooks";

const AvailableUsers = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) {
    return <Spinner label="Loading users..." />;
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          {error?.message || "Error loading users. Please try again later."}
        </p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <p>No users yet. Create the first one.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <ul className="divide-y divide-border rounded-md border border-border">
        {users.map((user) => {
          return (
            <li
              key={user.id}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {user.username}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to="/users/$userId"
                  params={{ userId: user.id }}
                  className="rounded-md px-2.5 py-1 text-xs font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  View
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { AvailableUsers };
