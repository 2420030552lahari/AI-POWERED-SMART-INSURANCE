"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PawPrint, Check, Heart, Stethoscope, Shield, Pill, ArrowRight } from "lucide-react"
import { PremiumCalculator } from "@/components/premium-calculator"
import Link from "next/link"

export default function PetInsurancePage() {
  const [showCalculator, setShowCalculator] = useState(false)

  const plans = [
    {
      name: "Basic Care",
      price: "₹3,500",
      period: "/year",
      features: [
        "Accident Cover up to ₹50,000",
        "Emergency Treatment",
        "Third Party Liability",
        "Death Due to Accident",
        "24/7 Vet Helpline",
      ],
      popular: false,
    },
    {
      name: "Complete Care",
      price: "₹7,500",
      period: "/year",
      features: [
        "Accident & Illness Cover up to ₹1.5 Lakhs",
        "Hospitalization & Surgery",
        "Pre & Post Hospitalization",
        "Diagnostic Tests",
        "Vaccination Cover",
        "Third Party Liability up to ₹5 Lakhs",
        "Lost Pet Advertising",
        "Annual Health Check-up",
      ],
      popular: true,
    },
    {
      name: "Premium Care",
      price: "₹12,000",
      period: "/year",
      features: [
        "Comprehensive Cover up to ₹3 Lakhs",
        "Chronic Illness Management",
        "Hereditary Conditions",
        "Dental Treatment",
        "Behavioral Therapy",
        "Alternative Treatments",
        "Boarding Kennel Fees",
        "Pet Holiday Cancellation",
        "Priority Vet Network Access",
        "International Travel Cover",
      ],
      popular: false,
    },
  ]

  const benefits = [
    {
      icon: Stethoscope,
      title: "Veterinary Bills",
      description: "Coverage for vet consultations, treatments, and surgeries",
      color: "from-green-500/10 to-emerald-600/10",
      iconColor: "text-green-600",
    },
    {
      icon: Pill,
      title: "Medication & Care",
      description: "Medicines, vaccinations, and preventive care covered",
      color: "from-blue-500/10 to-cyan-600/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Third Party Liability",
      description: "Protection against damages caused by your pet",
      color: "from-orange-500/10 to-amber-600/10",
      iconColor: "text-orange-600",
    },
    {
      icon: Heart,
      title: "Emotional Support",
      description: "Lost pet finding assistance and advertising costs",
      color: "from-pink-500/10 to-rose-600/10",
      iconColor: "text-pink-600",
    },
  ]

  const coverageTypes = [
    "Accident Cover",
    "Illness Treatment",
    "Surgery & Hospitalization",
    "Diagnostic Tests",
    "Vaccinations",
    "Third Party Liability",
    "Dental Treatment",
    "Hereditary Conditions",
    "Chronic Illness",
    "Alternative Therapies",
    "Lost Pet Finding",
    "Boarding Fees",
  ]

  const petTypes = [
    { name: "Dogs", emoji: "🐕", breeds: "All breeds covered" },
    { name: "Cats", emoji: "🐈", breeds: "All breeds covered" },
    { name: "Birds", emoji: "🦜", breeds: "Exotic & domestic" },
    { name: "Others", emoji: "🐹", breeds: "Rabbits, hamsters & more" },
  ]

  if (showCalculator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => setShowCalculator(false)} className="mb-6">
          ← Back to Plans
        </Button>
        <PremiumCalculator productType="pet" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <PawPrint className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">Pet Insurance</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Because Your Pet Deserves the Best Care</h1>
            <p className="mb-8 text-lg text-green-100">
              Comprehensive health insurance for your furry friends. Cover vet bills, accidents, illnesses, and more
              with affordable plans.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="bg-white text-green-700 hover:bg-green-50"
              >
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/customer/support">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25,000+</div>
              <div className="text-sm text-muted-foreground">Happy Pet Parents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-sm text-muted-foreground">Network Vets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">97.5%</div>
              <div className="text-sm text-muted-foreground">Claim Settlement Ratio</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Pet Types */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">We Cover All Your Furry Friends</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {petTypes.map((pet, index) => (
              <Card
                key={index}
                className="border-2 text-center transition-all hover:-translate-y-1 hover:border-green-500 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 text-5xl">{pet.emoji}</div>
                  <CardTitle className="text-xl">{pet.name}</CardTitle>
                  <CardDescription>{pet.breeds}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Why Choose Pet Insurance?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className={`mb-3 inline-flex rounded-2xl bg-gradient-to-br ${benefit.color} p-3`}>
                    <benefit.icon className={`h-6 w-6 ${benefit.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage Types */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Complete Pet Care Coverage</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coverageTypes.map((type, index) => (
              <Card key={index} className="border-2">
                <CardContent className="flex items-center gap-3 p-4">
                  <Check className="h-5 w-5 shrink-0 text-green-600" />
                  <span className="text-sm font-medium">{type}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Pet Care Plan</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Affordable insurance plans tailored to your pet's needs and your budget
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? "border-green-600 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600">Most Popular</Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setShowCalculator(true)}
                  >
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-2 text-2xl font-bold">Protect Your Pet Today</h3>
            <p className="mb-6 text-muted-foreground">
              Get comprehensive pet insurance with instant policy issuance and nationwide vet network access.
            </p>
            <Button size="lg" onClick={() => setShowCalculator(true)} className="bg-green-600 hover:bg-green-700">
              Calculate Premium Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
