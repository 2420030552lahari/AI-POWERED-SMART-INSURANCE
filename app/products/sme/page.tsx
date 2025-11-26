"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Check, Shield, TrendingUp, Users, FileText, ArrowRight } from "lucide-react"
import { PremiumCalculator } from "@/components/premium-calculator"
import Link from "next/link"

export default function SMEInsurancePage() {
  const [showCalculator, setShowCalculator] = useState(false)

  const plans = [
    {
      name: "Basic Business",
      price: "₹12,000",
      period: "/year",
      features: [
        "Property Damage Cover up to ₹10 Lakhs",
        "Stock & Inventory Protection",
        "Fire & Natural Calamities",
        "Basic Liability Cover",
        "24/7 Claims Support",
      ],
      popular: false,
    },
    {
      name: "Complete Business",
      price: "₹24,000",
      period: "/year",
      features: [
        "Property Damage Cover up to ₹25 Lakhs",
        "Equipment & Machinery Cover",
        "Business Interruption Insurance",
        "Employee Compensation",
        "Public Liability up to ₹50 Lakhs",
        "Cyber Risk Basic Cover",
        "Legal Expenses Cover",
      ],
      popular: true,
    },
    {
      name: "Enterprise Shield",
      price: "₹45,000",
      period: "/year",
      features: [
        "Property Damage Cover up to ₹50 Lakhs",
        "All Risks Equipment Cover",
        "Business Interruption up to 12 months",
        "Professional Indemnity",
        "Public & Product Liability",
        "Cyber Security Comprehensive",
        "Directors & Officers Liability",
        "Key Person Insurance",
        "Priority Claims Settlement",
      ],
      popular: false,
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Cover for property, inventory, equipment, and business operations",
    },
    {
      icon: TrendingUp,
      title: "Business Continuity",
      description: "Financial support during business interruption and recovery",
    },
    {
      icon: Users,
      title: "Employee Coverage",
      description: "Workers compensation and employee welfare benefits included",
    },
    {
      icon: FileText,
      title: "Legal Protection",
      description: "Coverage for legal expenses and liability claims",
    },
  ]

  const coverageTypes = [
    "Property & Building",
    "Stock & Inventory",
    "Plant & Machinery",
    "Electronic Equipment",
    "Business Interruption",
    "Public Liability",
    "Product Liability",
    "Professional Indemnity",
    "Employee Compensation",
    "Cyber Risk",
    "Directors & Officers",
    "Crime & Fidelity",
  ]

  if (showCalculator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => setShowCalculator(false)} className="mb-6">
          ← Back to Plans
        </Button>
        <PremiumCalculator productType="sme" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-violet-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Building2 className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">SME Insurance</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Protect Your Business, Secure Your Future</h1>
            <p className="mb-8 text-lg text-purple-100">
              Comprehensive insurance solutions for Small & Medium Enterprises. Safeguard your business assets,
              employees, and operations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="bg-white text-purple-700 hover:bg-purple-50"
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
              <div className="text-3xl font-bold text-purple-600">50,000+</div>
              <div className="text-sm text-muted-foreground">Businesses Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95.8%</div>
              <div className="text-sm text-muted-foreground">Claim Settlement Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24 Hours</div>
              <div className="text-sm text-muted-foreground">Claim Intimation</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Coverage Types */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Complete Business Coverage</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coverageTypes.map((type, index) => (
              <Card key={index} className="border-2">
                <CardContent className="flex items-center gap-3 p-4">
                  <Check className="h-5 w-5 shrink-0 text-purple-600" />
                  <span className="text-sm font-medium">{type}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Why Choose SME Insurance?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="mb-3 inline-flex rounded-2xl bg-purple-100 p-3">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Business Plan</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Flexible insurance solutions tailored to your business size and needs
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? "border-purple-600 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600">Most Popular</Badge>
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
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
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
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-2 text-2xl font-bold">Ready to Protect Your Business?</h3>
            <p className="mb-6 text-muted-foreground">
              Get a customized quote in minutes. No paperwork, instant policy issuance.
            </p>
            <Button size="lg" onClick={() => setShowCalculator(true)} className="bg-purple-600 hover:bg-purple-700">
              Calculate Premium Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
