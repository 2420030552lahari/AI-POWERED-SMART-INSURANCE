"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ArrowLeft } from "lucide-react"
import { AIRecommendations } from "@/components/ai/ai-recommendations"
import { getAIPolicyRecommendations } from "@/lib/ai/policy-recommendations"
import Link from "next/link"
import { GradientText } from "@/components/ui/gradient-text"

export default function AIComparePage() {
  const [age, setAge] = useState(30)
  const [coverage, setCoverage] = useState(500000)
  const [dependents, setDependents] = useState(2)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGetRecommendations = async () => {
    setIsLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const recs = getAIPolicyRecommendations(age, coverage, dependents)
    setRecommendations(recs)
    setIsLoading(false)
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/customer/policies">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              <GradientText variant="primary">AI Policy Recommender</GradientText>
            </h1>
            <p className="text-muted-foreground">Get personalized insurance recommendations powered by AI</p>
          </div>
        </div>

        <Card className="shadow-card">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Your Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number.parseInt(e.target.value) || 0)}
                  min={18}
                  max={80}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverage">Current Coverage</Label>
                <Select value={coverage.toString()} onValueChange={(v) => setCoverage(Number.parseInt(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300000">₹3 Lakh</SelectItem>
                    <SelectItem value="500000">₹5 Lakh</SelectItem>
                    <SelectItem value="1000000">₹10 Lakh</SelectItem>
                    <SelectItem value="2000000">₹20 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dependents">Dependents</Label>
                <Input
                  id="dependents"
                  type="number"
                  value={dependents}
                  onChange={(e) => setDependents(Number.parseInt(e.target.value) || 0)}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full gap-2">
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Get AI Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {recommendations.length > 0 && (
          <AIRecommendations
            recommendations={recommendations}
            onViewDetails={(id) => console.log("View details:", id)}
          />
        )}
      </div>
    </CustomerLayout>
  )
}
