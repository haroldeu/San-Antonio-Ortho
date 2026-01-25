import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-3.5 text-base"
};

const variantStyles = {
  primary:
    "bg-primary text-white shadow-soft hover:shadow-lift hover:scale-[1.02]",
  secondary:
    "bg-white text-primary-deep border border-border hover:shadow-soft hover:scale-[1.02]",
  ghost: "bg-transparent text-primary-deep hover:bg-white/60"
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-medium transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button };
