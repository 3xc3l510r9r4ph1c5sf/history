import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "terminal-input flex h-9 w-full min-w-0 px-3 py-1 text-base transition-all outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-black",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-primary",
        className
      )}
      {...props}
    />
  )
}

export { Input }
