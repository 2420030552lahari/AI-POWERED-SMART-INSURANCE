import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"
import Link from "next/link"
import type { Policy } from "@/lib/api/mock-data/policies"

export function PolicyCard({ policy }: { policy: Policy }) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-1 gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-2 ring-primary/5 transition-all group-hover:bg-primary/20 group-hover:ring-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{policy.name}</h3>
                <Badge
                  variant="outline"
                  className={
                    policy.status === "active"
                      ? "border-success/20 bg-success/10 text-success"
                      : policy.status === "expired"
                        ? "border-destructive/20 bg-destructive/10 text-destructive"
                        : "border-warning/20 bg-warning/10 text-warning"
                  }
                >
                  {policy.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm font-mono text-muted-foreground">{policy.policyNumber}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{policy.description}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Coverage</span>
                  <span className="font-semibold text-primary">₹{(policy.coverageAmount / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Premium</span>
                  <span className="font-semibold">₹{policy.premium.toLocaleString()}/yr</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Renewal</span>
                  <span className="font-semibold">{policy.renewalDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/customer/policies/${policy.id}`}>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                View
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
