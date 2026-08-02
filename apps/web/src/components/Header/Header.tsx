import { Link } from "@tanstack/react-router";

const navLinkProps = {
  className:
    "rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  activeProps: { className: "bg-accent text-foreground" },
} as const;

const Header = () => {
  return (
    <div className="bg-background">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link
            to="/"
            className="font-mono text-sm font-semibold tracking-[0.2em] uppercase"
          >
            TurboToDo
          </Link>
          <nav aria-label="Main">
            <ul className="flex items-center gap-1">
              <li>
                <Link to="/users" {...navLinkProps}>
                  Users
                </Link>
              </li>
              <li>
                <Link to="/todos" {...navLinkProps}>
                  Todos
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
