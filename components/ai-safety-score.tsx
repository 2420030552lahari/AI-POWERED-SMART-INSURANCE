"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, TrendingUp, CheckCircle, Award } from "lucide-react"

export function AISafetyScore() {
  const score = 850
  const maxScore = 1000

  const factors = [
    { name: "Policy Coverage", score: 95, description: "Comprehensive coverage" },
    { name: "Claim History", score: 100, description: "No fraudulent claims" },
    { name: "Premium Payment", score: 100, description: "Always on time" },
    { name: "KYC Compliance", score: 100, description: "Fully verified" },
    { name: "Vehicle Safety", score: 80, description: "Good maintenance record" },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 800) return "text-success"
    if (score >= 600) return "text-warning"
    return "text-destructive"
  }

  const getScoreRating = (score: number) => {
    if (score >= 900) return "Excellent"
    if (score >= 800) return "Very Good"
    if (score >= 700) return "Good"
    if (score >= 600) return "Fair"
    return "Poor"
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              AI Safety Score
            </CardTitle>
            <CardDescription>Your personalized risk assessment</CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Award className="h-3 w-3" />
            Premium Member
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</div>
          <div className="mt-2 text-sm text-muted-foreground">out of {maxScore}</div>
          <Badge className="mt-3" variant="default">
            {getScoreRating(score)}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Score</span>
            <span className="font-semibold">{((score / maxScore) * 100).toFixed(0)}%</span>
          </div>
          <Progress value={(score / maxScore) * 100} className="h-3" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Score Factors</h4>
          {factors.map((factor, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{factor.name}</span>
                <div className="flex items-center gap-2">
                  {factor.score === 100 && <CheckCircle className="h-4 w-4 text-success" />}
                  <span className="font-semibold">{factor.score}%</span>
                </div>
              </div>
              <Progress value={factor.score} className="h-1.5" />
              <p className="text-xs text-muted-foreground">{factor.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 shrink-0 text-primary" />
            <div className="text-sm">
              <p className="font-medium">Keep up the good work!</p>
              <p className="text-muted-foreground">Your score improved by 25 points this month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
