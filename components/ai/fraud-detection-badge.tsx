import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FraudDetectionBadgeProps {
  score: number
  showIcon?: boolean
  className?: string
}

export function FraudDetectionBadge({ score, showIcon = true, className }: FraudDetectionBadgeProps) {
  const getRiskLevel = () => {
    if (score < 30) return { level: "Low Risk", variant: "success", icon: Shield }
    if (score < 70) return { level: "Medium Risk", variant: "warning", icon: AlertCircle }
    return { level: "High Risk", variant: "destructive", icon: AlertTriangle }
  }

  const { level, variant, icon: Icon } = getRiskLevel()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div
          className={cn(
            "rounded-full p-2",
            variant === "success" && "bg-success/10",
            variant === "warning" && "bg-warning/10",
            variant === "destructive" && "bg-destructive/10",
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4",
              variant === "success" && "text-success",
              variant === "warning" && "text-warning",
              variant === "destructive" && "text-destructive",
            )}
          />
        </div>
      )}
      <div>
        <Badge
          variant="outline"
          className={cn(
            variant === "success" && "bg-success/10 text-success border-success/20",
            variant === "warning" && "bg-warning/10 text-warning-foreground border-warning/20",
            variant === "destructive" && "bg-destructive/10 text-destructive border-destructive/20",
          )}
        >
          {level}: {score.toFixed(0)}%
        </Badge>
      </div>
    </div>
  )
}
