import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold bg-black text-white hover:bg-white hover:text-black transition-colors duration-300",
        className
      )}
      {...props}
    >
      {/* DEFAULT STATE (visible before hover) */}
      <div className="flex items-center gap-2">
        <div
          className="
            h-2 w-2 rounded-full bg-white
            transition-all duration-300
            group-hover:bg-black
            group-hover:scale-[100.8]
          "
        ></div>

        <span
          className="
            inline-block transition-all duration-300
            group-hover:translate-x-12 group-hover:opacity-0
          "
        >
          {children}
        </span>
      </div>

      {/* HOVER STATE (slides in) */}
      <div
        className="
          absolute top-0 z-10 flex h-full w-full items-center justify-center gap-2
          translate-x-12 opacity-0
          transition-all duration-300
          group-hover:-translate-x-5 group-hover:opacity-100
        "
      >
        <span className="text-black">{children}</span>
        <ArrowRight className="text-black" />
      </div>
    </button>
  )
}
