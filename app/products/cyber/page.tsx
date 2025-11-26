"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, Lock, AlertTriangle, Server, FileText, ArrowRight } from "lucide-react"
import { PremiumCalculator } from "@/components/premium-calculator"
import Link from "next/link"

export default function CyberInsurancePage() {
  const [showCalculator, setShowCalculator] = useState(false)

  const plans = [
    {
      name: "Cyber Essentials",
      price: "₹8,000",
      period: "/year",
      features: [
        "Data Breach Cover up to ₹5 Lakhs",
        "Ransomware Protection",
        "Cyber Extortion Cover",
        "Privacy Liability",
        "24/7 Incident Response",
      ],
      popular: false,
    },
    {
      name: "Cyber Shield Pro",
      price: "₹18,000",
      period: "/year",
      features: [
        "Data Breach Cover up to ₹15 Lakhs",
        "Business Interruption Loss",
        "Cyber Crime & Fraud Cover",
        "Forensic Investigation Support",
        "Legal & Regulatory Defense",
        "Public Relations Support",
        "Credit Monitoring Services",
      ],
      popular: true,
    },
    {
      name: "Enterprise Cyber",
      price: "₹35,000",
      period: "/year",
      features: [
        "Data Breach Cover up to ₹50 Lakhs",
        "Network Security Liability",
        "Intellectual Property Theft",
        "Supply Chain Cyber Events",
        "Media Liability",
        "Social Engineering Fraud",
        "Dedicated Cyber Security Team",
        "Proactive Threat Monitoring",
        "Annual Security Audit",
      ],
      popular: false,
    },
  ]

  const threats = [
    {
      icon: Lock,
      title: "Data Breaches",
      description: "Protection against unauthorized access and data theft",
      color: "from-red-500/10 to-pink-600/10",
      iconColor: "text-red-600",
    },
    {
      icon: AlertTriangle,
      title: "Ransomware Attacks",
      description: "Coverage for ransom payments and recovery costs",
      color: "from-orange-500/10 to-amber-600/10",
      iconColor: "text-orange-600",
    },
    {
      icon: Server,
      title: "Business Disruption",
      description: "Compensation for revenue loss due to cyber incidents",
      color: "from-blue-500/10 to-cyan-600/10",
      iconColor: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Legal Liabilities",
      description: "Defense costs and regulatory fines coverage",
      color: "from-purple-500/10 to-violet-600/10",
      iconColor: "text-purple-600",
    },
  ]

  const coverageTypes = [
    "Data Breach Response",
    "Ransomware & Malware",
    "Business Interruption",
    "Cyber Extortion",
    "Privacy Liability",
    "Network Security Liability",
    "Media Liability",
    "Intellectual Property Theft",
    "Social Engineering Fraud",
    "Forensic Investigation",
    "Legal & Regulatory Defense",
    "Public Relations Management",
  ]

  if (showCalculator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => setShowCalculator(false)} className="mb-6">
          ← Back to Plans
        </Button>
        <PremiumCalculator productType="cyber" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Shield className="mr-2 h-5 w-5" />
              <span className="text-sm font-medium">Cyber Insurance</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Stay Protected in the Digital World</h1>
            <p className="mb-8 text-lg text-indigo-100">
              Comprehensive cyber insurance for businesses and individuals. Protect against data breaches, ransomware,
              and digital threats.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setShowCalculator(true)}
                className="bg-white text-indigo-700 hover:bg-indigo-50"
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
              <div className="text-3xl font-bold text-indigo-600">₹50 Cr+</div>
              <div className="text-sm text-muted-foreground">Claims Paid</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">10,000+</div>
              <div className="text-sm text-muted-foreground">Cyber Threats Prevented</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-muted-foreground">Incident Response Team</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Cyber Threats */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">What We Protect You Against</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {threats.map((threat, index) => (
              <Card key={index} className="border-2 transition-all hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-3 inline-flex rounded-2xl bg-gradient-to-br ${threat.color} p-3`}>
                    <threat.icon className={`h-6 w-6 ${threat.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg">{threat.title}</CardTitle>
                  <CardDescription>{threat.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Coverage Types */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold">Comprehensive Cyber Coverage</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coverageTypes.map((type, index) => (
              <Card key={index} className="border-2">
                <CardContent className="flex items-center gap-3 p-4">
                  <Check className="h-5 w-5 shrink-0 text-indigo-600" />
                  <span className="text-sm font-medium">{type}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Protection Level</h2>
          <p className="mb-8 text-center text-muted-foreground">
            Scalable cyber insurance plans for individuals and businesses of all sizes
          </p>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? "border-indigo-600 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600">Most Popular</Badge>
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
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
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
        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
          <CardContent className="p-8 text-center">
            <h3 className="mb-2 text-2xl font-bold">Secure Your Digital Future Today</h3>
            <p className="mb-6 text-muted-foreground">
              Get comprehensive cyber protection with instant policy issuance and 24/7 incident response.
            </p>
            <Button size="lg" onClick={() => setShowCalculator(true)} className="bg-indigo-600 hover:bg-indigo-700">
              Calculate Premium Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
