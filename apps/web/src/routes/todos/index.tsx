import { Panel } from "@repo/shared";
import { Todos, CreateTodoForm } from "@repo/todos";
import { useAtom } from "jotai";
import { selectedUserIdAtom } from "@repo/shared";

const TodosPage = () => {
  const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Add Todos
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a new todo or select an existing todo to view and manage its
          details.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <Panel
          title="Create Todo"
          description="Fill out the form to create a new todo."
        >
          <CreateTodoForm
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        </Panel>
        <Panel
          title="Existing Todos"
          description={
            selectedUserId
              ? "Filtered todos for selected user."
              : "All todos from all users."
          }
        >
          <Todos userId={selectedUserId} />
        </Panel>
      </div>
    </div>
  );
};

export default TodosPage;
