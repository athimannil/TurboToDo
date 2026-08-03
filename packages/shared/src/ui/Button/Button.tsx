import { Spinner } from "../Spinner/Spinner";
import type { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}
const Button = ({
  loading,
  disabled,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 
        ${className}
        ${variant === "primary" ? " bg-primary text-primary-foreground hover:bg-primary/90" : ""}
        ${variant === "outline" ? " border border-border bg-transparent text-foreground hover:bg-accent" : ""}
        ${variant === "ghost" ? " text-muted-foreground hover:bg-accent hover:text-foreground" : ""}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
};

export { Button };
