import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-lg border border-burn-pink/60 bg-black/5 backdrop-blur-xl",
        "px-3 py-3 font-cg text-lg text-burn-pink placeholder:text-white/50 transition-[color,box-shadow,background-color] outline-none",
        "focus:border-[#4C3032]/60 focus:shadow-lg focus:shadow-[#4C3032]/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
