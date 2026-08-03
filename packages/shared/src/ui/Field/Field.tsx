import type { ReactNode } from "react";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby"?: string;
  }) => ReactNode;
}

const Field = ({ id, label, hint, error, children }: FieldProps) => {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
      })}
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export { Field };
