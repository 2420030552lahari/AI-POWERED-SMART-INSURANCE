import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  variant?: "default" | "gradient"
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary",
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "p-6 hover-lift transition-smooth border-border/50 shadow-card group",
        variant === "gradient" && "gradient-primary text-white border-0",
        className,
      )}
    >
      <div
        className={cn(
          "inline-flex p-3 rounded-xl mb-4 transition-transform group-hover:scale-110 bg-red-200",
          variant === "gradient"
            ? "bg-white/20"
            : cn(
                "bg-primary/10",
                iconColor === "text-success" && "bg-success/10",
                iconColor === "text-warning" && "bg-warning/10",
                iconColor === "text-accent" && "bg-accent/10",
              ),
        )}
      >
        <Icon className={cn("h-6 w-6", variant === "gradient" ? "text-white" : iconColor)} />
      </div>
      <h3
        className={cn(
          "text-lg font-semibold mb-2 text-balance",
          variant === "gradient" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h3>
      <p className={cn("text-sm leading-relaxed", variant === "gradient" ? "text-white/90" : "text-muted-foreground")}>
        {description}
      </p>
    </Card>
  )
}
