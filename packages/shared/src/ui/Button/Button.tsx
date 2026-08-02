import type { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
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
      className={`inline-flex items-center cursor-pointer justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 ${className} ${variant === "primary" ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
