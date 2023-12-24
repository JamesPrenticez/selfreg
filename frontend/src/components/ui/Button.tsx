import React, { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react"
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "major" | "minor";
  variant?: "outlined" | "filled" | "link";
  asChild?: boolean; // TODO do we have a use for this prop?
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className,
  variant = "filled",
  color = 'secondary',
  asChild = false,
  children,
  ...props
}, ref) => {

  const options:any = {
    primary: {
      outlined: "border-2 border-primary",
      filled: "bg-primary hover:bg-primary/80"
    },
    secondary: {
      outlined: "border-2 border-secondary",
      filled: "bg-secondary hover:bg-secondary/80"
    },
    success: {
      outlined: "border-2 border-green-600",
      filled: "bg-green-600 hover:bg-green-600/80"
    },
    error: {
      outlined: "border-2 border-red-600",
      filled: "bg-red-600 hover:bg-red-600/80"
    },
    major: {
      outlined: "border-2 border-major",
      filled: "bg-major hover:bg-major/80"
    },
    minor: {
      outlined: "border-2 border-minor",
      filled: "bg-minor hover:bg-minor/80"
    },
    info: {
      outlined: "border-2 border-blue-600",
      filled: "bg-blue-600 hover:bg-blue-600/80"
    },
  };

  return (
    <button
      className={twMerge(`
        px-8
        py-2
        rounded-md
        cursor-pointer 
        text-primary 
        font-medium
        `, options[color][variant], className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };