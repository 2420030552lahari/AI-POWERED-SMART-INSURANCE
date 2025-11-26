import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <Card className="shadow-lg rounded-3xl">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-6 mb-6">
          <Icon className="h-16 w-16 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        {(actionLabel && actionHref) && (
          <Link href={actionHref}>
            <Button className="rounded-xl">{actionLabel}</Button>
          </Link>
        )}
        {(actionLabel && onAction) && (
          <Button onClick={onAction} className="rounded-xl">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
