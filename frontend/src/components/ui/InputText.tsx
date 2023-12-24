import * as React from "react"

import { twMerge } from 'tailwind-merge'

 interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // add custom props here
}


const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          ` flex 
            h-10
            w-full 
            rounded-md
            border 
            bg-primary
            text-muted
            px-3
            py-2
            text-sm
            border-none
            placeholder:text-disabled
            focus-visible:outline-none 
            focus-visible:ring-[1px]
            focus-visible:ring-muted
            disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputText.displayName = "Input"

export { InputText }
