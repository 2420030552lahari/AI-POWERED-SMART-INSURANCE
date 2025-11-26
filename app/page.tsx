"use client"

import { useTranslation } from "@/lib/i18n/use-translation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Sparkles, Clock, FileCheck, ArrowRight, CheckCircle } from "lucide-react"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { FeatureCard } from "@/components/ui/feature-card"
import { GradientText } from "@/components/ui/gradient-text"
import { QuoteSearchBar } from "@/components/quote-search-bar"
import { QuickActions } from "@/components/quick-actions"
import { ProductGrid } from "@/components/product-grid"
import { USPSection } from "@/components/usp-section"
import { PromoCarousel } from "@/components/promo-carousel"
import Link from "next/link"

export default function HomePage() {
  const t = useTranslation()

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Claims",
      description: "Instant claim processing with OCR document scanning and fraud detection",
      iconColor: "text-primary",
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Get instant quotes and policy approvals in minutes, not days",
      iconColor: "text-accent",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Bank-level security with IRDAI compliance and data protection",
      iconColor: "text-success",
    },
    {
      icon: FileCheck,
      title: "Digital KYC",
      description: "Complete your KYC online with Aadhaar e-KYC verification",
      iconColor: "text-warning",
    },
  ]

  const plans = [
    {
      name: "Health Shield",
      description: "Comprehensive health coverage",
      price: "₹12,000",
      period: "/year",
      coverage: "₹5 Lakh",
      features: ["Cashless hospitalization", "Pre & post hospitalization", "Ambulance cover", "No claim bonus"],
    },
    {
      name: "Life Protect",
      description: "Term life insurance",
      price: "₹10,000",
      period: "/year",
      coverage: "₹50 Lakh",
      features: ["Tax benefits u/s 80C", "Accidental death benefit", "Critical illness rider", "Premium waiver"],
      popular: true,
    },
    {
      name: "Vehicle Care",
      description: "Car & bike insurance",
      price: "₹7,500",
      period: "/year",
      coverage: "₹10 Lakh",
      features: ["Zero depreciation", "Engine protection", "Roadside assistance", "NCB protection"],
    },
  ]

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b glass shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Smart Insurance</span>
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/auth/login">
              <Button variant="ghost">{t.common.login}</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="gap-2">
                {t.common.signup}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary-light/30 to-accent/20 px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance lg:text-6xl">
              <GradientText variant="primary">Smart Insurance</GradientText>

            </h1>
            <p className="mb-8 text-xl leading-relaxed text-muted-foreground text-balance">
              Get instant quotes, compare plans, and buy insurance online in minutes with AI-powered recommendations
            </p>

            <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/renew">
                <Button size="lg" variant="outline" className="gap-2 bg-white shadow-lg">
                  Renew Policy
                </Button>
              </Link>
              <Link href="/customer/claims/new">
                <Button size="lg" className="gap-2 bg-accent shadow-lg hover:bg-accent/90">
                  <Sparkles className="h-4 w-4" />
                  Instant Claim Upload
                </Button>
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <QuoteSearchBar />
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">AI Claim Estimator</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">AI Plan Recommendation</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">24/7 Chat Assistant</span>
            </div>
          </div>
        </div>
      </section >

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold">
            <GradientText variant="primary">Quick Actions</GradientText>
          </h2>
          <p className="text-muted-foreground">Everything you need, just a click away</p>
        </div>
        <QuickActions />
      </section>

      <section className="bg-gradient-to-b from-background to-secondary/30 px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              <GradientText variant="accent">Why Choose Smart Insurance?</GradientText>
            </h2>
            <p className="text-muted-foreground">Trusted by millions of Indians for insurance protection</p>
          </div>
          <USPSection />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <PromoCarousel />
      </section>

      <section className="px-4 py-16">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold">
              <GradientText variant="primary">Insurance Products</GradientText>
            </h2>
            <p className="text-muted-foreground">Comprehensive coverage for all your protection needs</p>
          </div>
          <ProductGrid />
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">
            <GradientText variant="primary">{t.home.featuresTitle}</GradientText>
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Modern insurance solutions powered by AI and designed for India
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </section>

      <section id="plans" className="bg-gradient-to-b from-background to-secondary/30 px-4 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-balance">
              <GradientText variant="accent">{t.home.plansTitle}</GradientText>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Choose the perfect insurance plan for your needs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative hover-lift transition-smooth ${plan.popular ? "border-2 border-primary shadow-xl scale-105" : "border shadow-card"
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="gradient-primary rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <div className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                    Coverage: {plan.coverage}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup" className="block">
                    <Button className="w-full shadow-md" variant={plan.popular ? "default" : "outline"}>
                      {t.policies.buyNow}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <Card className="border-2 gradient-primary text-white shadow-xl hover-lift">
          <CardContent className="flex flex-col items-center gap-6 p-16 text-center">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <Shield className="h-16 w-16 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-balance">Ready to get protected?</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/90">
              Join thousands of Indians who trust Smart Insurance for their protection needs
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="gap-2 shadow-lg">
                {t.home.getStarted}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">Smart Insurance</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                AI-powered insurance solutions for modern India. IRDAI Registration No: IRDAI/HO/2024/12345
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products/motor" className="hover:text-primary">
                    Motor Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/products/health" className="hover:text-primary">
                    Health Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/products/travel" className="hover:text-primary">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/products/home" className="hover:text-primary">
                    Home Insurance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/renew" className="hover:text-primary">
                    Renew Policy
                  </Link>
                </li>
                <li>
                  <Link href="/customer/claims/new" className="hover:text-primary">
                    File a Claim
                  </Link>
                </li>
                <li>
                  <Link href="/network" className="hover:text-primary">
                    Network Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="/downloads" className="hover:text-primary">
                    Downloads
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>IRDAI Compliance</li>
                <li>Grievance Redressal</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 Smart Insurance. All rights reserved. | Insurance is subject to risk. For more details on risk
            factors, terms and conditions, please read the sales brochure carefully before concluding a sale.
          </div>
        </div>
      </footer>
    </div >
  )
}
