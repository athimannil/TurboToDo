import { Panel } from "@repo/shared";
import { AvailableUsers } from "@repo/users";

const UsersList = () => {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Users
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a new user or select an existing user to view and manage their
          todos
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Panel
          title="Create User"
          description="Fill out the form to create a new user."
        >
          <p>User form</p>
        </Panel>
        <Panel
          title="Existing Users"
          description="Select a user to view their todos."
        >
          <AvailableUsers />
        </Panel>
      </div>
    </div>
  );
};

export default UsersList;
