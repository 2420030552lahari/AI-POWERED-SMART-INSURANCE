import type React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning-foreground",
        destructive: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
        default: "bg-muted text-muted-foreground",
      },
      withDot: {
        true: "pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      withDot: false,
    },
  },
)

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode
}

export function StatusBadge({ className, variant, withDot, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant, withDot }), className)} {...props}>
      {withDot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", {
            "bg-success": variant === "success",
            "bg-warning": variant === "warning",
            "bg-destructive": variant === "destructive",
            "bg-info": variant === "info",
            "bg-muted-foreground": variant === "default",
          })}
        />
      )}
      {children}
    </div>
  )
}
