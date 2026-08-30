import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "font-cg text-lg h-9 w-full min-w-0 rounded-lg border border-burn-pink/60 bg-black/5 backdrop-blur-xl px-3 py-5",
        "placeholder:text-white/70 transition-[color,box-shadow,background-color] outline-none ",
        "focus:border-[#4C3032]/60 focus:shadow-lg focus:shadow-[#4C3032]/10",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
