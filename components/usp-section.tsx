"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Hospital, Award, Users, CheckCircle } from "lucide-react"

export function USPSection() {
  const usps = [
    {
      icon: Clock,
      title: "24x7 Claim Assistance",
      description: "Round-the-clock support for all your claim needs",
      badge: "Always Available",
    },
    {
      icon: Hospital,
      title: "15,000+ Network Hospitals",
      description: "Cashless treatment at hospitals & garages across India",
      badge: "Nationwide",
    },
    {
      icon: Award,
      title: "98.5% Claim Settlement",
      description: "Industry-leading claim settlement ratio",
      badge: "IRDAI Certified",
    },
    {
      icon: Users,
      title: "5 Million+ Indians Trust Us",
      description: "Join millions who have chosen Smart Insurance",
      badge: "Trusted",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {usps.map((usp, index) => (
        <Card
          key={index}
          className="group border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
        >
          <CardContent className="pt-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 transition-transform group-hover:scale-110">
                <usp.icon className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {usp.badge}
              </Badge>
            </div>
            <h3 className="mb-2 font-semibold">{usp.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{usp.description}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-success">
              <CheckCircle className="h-4 w-4" />
              <span>Verified by IRDAI</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
