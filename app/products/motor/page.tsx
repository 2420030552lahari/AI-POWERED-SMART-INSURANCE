"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, Car, Wrench, Phone, Award, ArrowLeft } from "lucide-react"
import { PremiumCalculator } from "@/components/premium-calculator"
import { GradientText } from "@/components/ui/gradient-text"
import Link from "next/link"

export default function MotorInsurancePage() {
  const benefits = [
    { icon: Shield, title: "Zero Depreciation", description: "Get full claim without depreciation deduction" },
    { icon: Wrench, title: "Engine Protection", description: "Cover for engine and gearbox damage" },
    { icon: Phone, title: "24x7 Roadside Assistance", description: "Emergency support anytime, anywhere" },
    { icon: Award, title: "NCB Protection", description: "Protect your no claim bonus" },
  ]

  const addons = [
    { name: "Zero Depreciation", description: "No depreciation on parts", popular: true },
    { name: "Engine Protect", description: "Covers engine & gearbox damage" },
    { name: "Consumables Cover", description: "Covers nuts, bolts, oils" },
    { name: "Return-to-Invoice", description: "Get invoice value on total loss" },
    { name: "Roadside Assistance", description: "Towing, flat tire, fuel delivery" },
    { name: "NCB Protection", description: "Retain NCB even after claim" },
  ]

  const claimStats = [
    { label: "Claim Settlement", value: "98.5%", color: "text-success" },
    { label: "Average Processing", value: "48 hrs", color: "text-primary" },
    { label: "Network Garages", value: "5000+", color: "text-accent" },
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
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4">
              <Car className="h-10 w-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                <GradientText variant="primary">Motor Insurance</GradientText>
              </h1>
              <p className="text-lg text-muted-foreground">Comprehensive coverage for your car & bike</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          {claimStats.map((stat, index) => (
            <Card key={index} className="border-2">
              <CardContent className="pt-6 text-center">
                <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              <GradientText variant="accent">Calculate Your Premium</GradientText>
            </h2>
            <p className="text-muted-foreground">Get instant quote in just 3 minutes</p>
          </div>
          <PremiumCalculator type="motor" />
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">
            <GradientText variant="primary">Policy Benefits</GradientText>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3">
                    <benefit.icon className="h-6 w-6 text-primary" />
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
            <GradientText variant="accent">Available Add-ons</GradientText>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon, index) => (
              <Card key={index} className={`border ${addon.popular ? "border-2 border-primary" : ""}`}>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{addon.name}</h3>
                    {addon.popular && (
                      <Badge variant="default" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-success">
                    <CheckCircle className="h-4 w-4" />
                    <span>Recommended by experts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to protect your vehicle?</h2>
            <p className="mb-6 text-muted-foreground">Get the best motor insurance at competitive prices</p>
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
