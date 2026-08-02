import type { ReactNode } from "react";
import { useUser } from "../hooks";

interface UserDetailsProp {
  userId: string;
  actions?: ReactNode;
}

const UserDetails = ({ userId, actions }: UserDetailsProp) => {
  const { data: user, isLoading, error } = useUser(userId);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <p>Loading.........</p>;
  }

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-sm text-destructive">
          {error?.message ||
            "Error loading user details. Please try again later."}
        </p>
      </div>
    );
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <div className="flex gap-2 items-baseline">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          User
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          {user.username}
        </h1>
      </div>
      <dl className="mt-6 flex gap-4 flex-wrap justify-between">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ID
          </dt>
          <dd className="mt-1 break-all font-mono text-sm text-foreground">
            {user.id}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Created
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            {formatDate(user.createdAt)}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Updated
          </dt>
          <dd className="mt-1 text-sm text-foreground">
            {formatDate(user.updatedAt)}
          </dd>
        </div>
      </dl>

      {actions && <div className="mt-6 flex flex-wrap gap-2">{actions}</div>}
    </>
  );
};

export { UserDetails };
