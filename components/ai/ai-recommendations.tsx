"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle } from "lucide-react"
import type { PolicyRecommendation } from "@/lib/ai/policy-recommendations"

interface AIRecommendationsProps {
  recommendations: PolicyRecommendation[]
  onViewDetails?: (id: string) => void
}

export function AIRecommendations({ recommendations, onViewDetails }: AIRecommendationsProps) {
  if (recommendations.length === 0) {
    return null
  }

  return (
    <Card className="border-2 border-primary/20 shadow-xl">
      <CardHeader className="gradient-primary text-white">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <CardTitle className="text-white">AI-Powered Recommendations</CardTitle>
        </div>
        <CardDescription className="text-white/80">
          Personalized insurance suggestions based on your profile
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover-lift transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{rec.name}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      <Sparkles className="mr-1 h-3 w-3" />
                      {rec.aiScore}% Match
                    </Badge>
                  </div>
                  <CardDescription>{rec.reason}</CardDescription>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Coverage</p>
                  <p className="text-xl font-bold">₹{(rec.coverage / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Premium</p>
                  <p className="text-xl font-bold">₹{rec.premium.toLocaleString()}/year</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {rec.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-success mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={() => onViewDetails?.(rec.id)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
