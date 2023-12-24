import React, { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  className?: string;
  children?: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, Props>(({ value, className, children, ...props }, ref) => {
  return (
    <label ref={ref} {...props}>
      <h5
        className={twMerge(
          ` text-muted 
      text-sm
      mb-[8px]
      `,
          className
        )}
      >
        {value}
      </h5>
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
