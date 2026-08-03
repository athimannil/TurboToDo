interface SpinnerProps {
  label?: string;
}

const Spinner = ({ label }: SpinnerProps) => (
  <span className="inline-flex items-center gap-2">
    <span
      aria-hidden="true"
      className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    {label ? (
      <span className="text-sm text-muted-foreground">{label}</span>
    ) : null}
    <span className="sr-only">Loading</span>
  </span>
);

export { Spinner };
