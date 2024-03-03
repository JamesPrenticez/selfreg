import React, { forwardRef, type LabelHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
  className?: string;
  children?: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, Props>(({ value, className, children, ...props }, ref) => {
  return (
    <label ref={ref} {...props} className={twMerge(`mb-4`, className )}>
      <h5 className="text-muted text-sm mb-[8px] ">
        {value}
      </h5>
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
