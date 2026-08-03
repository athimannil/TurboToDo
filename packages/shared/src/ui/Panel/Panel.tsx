interface PanelProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Panel = ({ title, description, children }: PanelProps) => {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm self-start">
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
};

export { Panel };
