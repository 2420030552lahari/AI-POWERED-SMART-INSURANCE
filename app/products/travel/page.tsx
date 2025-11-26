"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plane, CheckCircle, ArrowLeft } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import Link from "next/link"

export default function TravelInsurancePage() {
  const plans = [
    {
      name: "Domestic",
      description: "Travel within India",
      price: "₹199",
      coverage: "₹5 Lakh",
      features: ["Medical emergency", "Trip cancellation", "Baggage loss", "Personal accident"],
    },
    {
      name: "International - Asia",
      description: "Asian countries",
      price: "₹999",
      coverage: "₹10 Lakh",
      features: ["Medical emergency", "Trip cancellation", "Baggage loss", "Passport loss", "Flight delay"],
      popular: true,
    },
    {
      name: "Worldwide",
      description: "Global coverage",
      price: "₹2,499",
      coverage: "₹25 Lakh",
      features: [
        "Medical emergency",
        "Trip cancellation",
        "Baggage loss",
        "Passport loss",
        "Flight delay",
        "Adventure sports",
      ],
    },
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
            <div className="rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-600/10 p-4">
              <Plane className="h-10 w-10 text-teal-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                <GradientText variant="primary">Travel Insurance</GradientText>
              </h1>
              <p className="text-lg text-muted-foreground">Stay protected on every journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="mb-6 text-center text-3xl font-bold">
            <GradientText variant="accent">Choose Your Plan</GradientText>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border-2 transition-all hover:-translate-y-1 ${
                  plan.popular ? "border-primary shadow-xl" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/trip</span>
                  </div>
                  <div className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                    Coverage: {plan.coverage}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
