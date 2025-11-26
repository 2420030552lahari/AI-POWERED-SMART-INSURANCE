"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Hospital, Ambulance, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import { PremiumCalculator } from "@/components/premium-calculator"
import { GradientText } from "@/components/ui/gradient-text"
import Link from "next/link"

export default function HealthInsurancePage() {
  const benefits = [
    { icon: Hospital, title: "Cashless Hospitalization", description: "15,000+ network hospitals" },
    { icon: Ambulance, title: "Emergency Ambulance", description: "Up to ₹5,000 per hospitalization" },
    { icon: Shield, title: "Pre & Post Hospitalization", description: "60 days pre, 180 days post" },
    { icon: Heart, title: "No Claim Bonus", description: "Up to 50% increase in sum insured" },
  ]

  const coverage = [
    "Room rent & ICU charges",
    "Doctor consultation fees",
    "Surgery & operation costs",
    "Medical tests & diagnostics",
    "Medicines & consumables",
    "Ambulance charges",
    "Pre & post hospitalization",
    "Daycare procedures",
    "AYUSH treatment",
    "Mental health coverage",
    "Maternity benefits",
    "New born baby cover",
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
            <div className="rounded-2xl bg-gradient-to-br from-red-500/10 to-pink-600/10 p-4">
              <Heart className="h-10 w-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                <GradientText variant="primary">Health Insurance</GradientText>
              </h1>
              <p className="text-lg text-muted-foreground">Comprehensive health coverage for you & your family</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              <GradientText variant="accent">Calculate Your Premium</GradientText>
            </h2>
            <p className="text-muted-foreground">Instant quote for individual & family plans</p>
          </div>
          <PremiumCalculator type="health" />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <GradientText variant="primary">Key Benefits</GradientText>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-red-500/10 to-pink-600/10 p-3">
                    <benefit.icon className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <GradientText variant="accent">What's Covered?</GradientText>
          </h2>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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

        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Protect your family's health today</h2>
            <p className="mb-6 text-muted-foreground">Comprehensive health insurance starting at ₹12,000/year</p>
            <Button size="lg" className="gap-2">
              Get Started Now
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
