"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, CheckCircle, ArrowLeft } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import Link from "next/link"

export default function HomeInsurancePage() {
  const coverage = [
    "Building structure damage",
    "Contents & valuables",
    "Natural calamities",
    "Fire & explosion",
    "Theft & burglary",
    "Public liability",
    "Electrical appliances",
    "Plumbing fixtures",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-600/10 p-4">
              <Home className="h-10 w-10 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                <GradientText variant="primary">Home Insurance</GradientText>
              </h1>
              <p className="text-lg text-muted-foreground">Protect your home sweet home</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="mb-6 text-center text-3xl font-bold">
            <GradientText variant="accent">Comprehensive Coverage</GradientText>
          </h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {coverage.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
