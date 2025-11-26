"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Shield, Clock } from "lucide-react"
import Link from "next/link"

export function RecommendationsWidget() {
  const recommendations = [
    {
      title: "Add Zero Depreciation",
      description: "Protect your car's full value without depreciation deductions on claims",
      price: "₹499",
      savings: "Save ₹15,000 on next claim",
      icon: Shield,
      variant: "primary" as const,
      href: "/customer/policies/pol_002?addon=zero-dep",
    },
    {
      title: "Get Roadside Assistance",
      description: "24/7 emergency support including towing, flat tire, and fuel delivery",
      price: "₹199",
      savings: "24x7 support",
      icon: TrendingUp,
      variant: "accent" as const,
      href: "/customer/policies/pol_002?addon=roadside",
    },
    {
      title: "Renew Early for 5% Discount",
      description: "Your health insurance is due for renewal in 45 days. Renew now and save!",
      price: "Save ₹750",
      savings: "Expires in 10 days",
      icon: Clock,
      variant: "warning" as const,
      href: "/renew?policy=HLT/2024/001234",
    },
  ]

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon
          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4 transition-all hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  rec.variant === "primary"
                    ? "bg-primary/10"
                    : rec.variant === "accent"
                      ? "bg-accent/10"
                      : "bg-warning/10"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${
                    rec.variant === "primary"
                      ? "text-primary"
                      : rec.variant === "accent"
                        ? "text-accent"
                        : "text-warning"
                  }`}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold">{rec.title}</h3>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-semibold">
                    {rec.price}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {rec.savings}</span>
                </div>
              </div>
              <Link href={rec.href}>
                <Button size="sm">Add Now</Button>
              </Link>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
