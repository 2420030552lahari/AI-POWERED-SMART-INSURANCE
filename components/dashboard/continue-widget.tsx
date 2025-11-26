"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ContinueWidget() {
  const continueItems = [
    {
      title: "Complete Motor Insurance Quote",
      description: "Honda City - Continue from vehicle details",
      progress: 60,
      href: "/buy?continue=quote_001",
      timeAgo: "2 hours ago",
    },
    {
      title: "Renew Health Insurance",
      description: "Complete payment to renew your policy",
      progress: 80,
      href: "/renew?policy=HLT/2024/001234",
      timeAgo: "1 day ago",
    },
  ]

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Continue Where You Left Off
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {continueItems.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4 transition-all hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Link href={item.href}>
                <Button size="sm" className="gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.progress}% complete</span>
                <span className="text-xs text-muted-foreground">{item.timeAgo}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${item.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
