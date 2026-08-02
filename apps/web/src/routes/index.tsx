import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Turborepo · React · TypeScript · Vite
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Two features, one composition root.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Users and ToDoItems live in separate packages that never import each
          other. Routing is TanStack Router, data access is TanStack Query over
          an in-memory fake api, and creating a todo is optimistic with real
          rollback.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/users"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Create a user
          </Link>
          <Link
            to="/todos"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Assign a todo
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
