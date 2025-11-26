import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "accent" | "success"
}

export function GradientText({ children, className, variant = "primary" }: GradientTextProps) {
  const gradients = {
    primary: "from-primary via-primary/90 to-info",
    accent: "from-accent via-accent/90 to-primary",
    success: "from-success via-success/90 to-accent",
  }

  return (
    <span className={cn("bg-gradient-to-r bg-clip-text font-bold text-primary", gradients[variant], className)}>
      {children}
    </span>
  )
}
