const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">TurboToDo</span>.
          Built for reference.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-4 text-sm text-muted-foreground">
            <li>
              <a
                href="#"
                className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="https://github.com/athimannil/ToDo"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
