"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Car, Heart, Plane, Home, Building2, Shield, PawPrint, ArrowRight } from "lucide-react"
import Link from "next/link"

export function ProductGrid() {
  const products = [
    {
      icon: Car,
      title: "Motor Insurance",
      description: "Car, Bike & Commercial Vehicle",
      features: ["Zero Depreciation", "Roadside Assistance", "NCB Protection"],
      color: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600",
      href: "/products/motor",
    },
    {
      icon: Heart,
      title: "Health Insurance",
      description: "Individual & Family Floater",
      features: ["Cashless Network", "Pre & Post Hospitalization", "No Claim Bonus"],
      color: "from-red-500/10 to-pink-600/10",
      iconColor: "text-red-600",
      href: "/products/health",
    },
    {
      icon: Plane,
      title: "Travel Insurance",
      description: "Domestic & International",
      features: ["Medical Emergency", "Trip Cancellation", "Lost Baggage"],
      color: "from-teal-500/10 to-cyan-600/10",
      iconColor: "text-teal-600",
      href: "/products/travel",
    },
    {
      icon: Home,
      title: "Home Insurance",
      description: "Building & Contents Cover",
      features: ["Natural Calamities", "Theft Protection", "Liability Cover"],
      color: "from-orange-500/10 to-amber-600/10",
      iconColor: "text-orange-600",
      href: "/products/home",
    },
    {
      icon: Building2,
      title: "SME Insurance",
      description: "Business Protection Plans",
      features: ["Property Cover", "Liability Insurance", "Business Interruption"],
      color: "from-purple-500/10 to-violet-600/10",
      iconColor: "text-purple-600",
      href: "/products/sme",
    },
    {
      icon: Shield,
      title: "Cyber Insurance",
      description: "Digital Business Protection",
      features: ["Data Breach Cover", "Cyber Liability", "Forensic Investigation"],
      color: "from-indigo-500/10 to-blue-600/10",
      iconColor: "text-indigo-600",
      href: "/products/cyber",
    },
    {
      icon: PawPrint,
      title: "Pet Insurance",
      description: "Coverage for Your Furry Friends",
      features: ["Veterinary Bills", "Surgery Cover", "Third Party Liability"],
      color: "from-green-500/10 to-emerald-600/10",
      iconColor: "text-green-600",
      href: "/products/pet",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <Card
          key={index}
          className="group border-2 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
        >
          <CardHeader>
            <div
              className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${product.color} p-4 transition-transform group-hover:scale-110`}
            >
              <product.icon className={`h-8 w-8 ${product.iconColor}`} />
            </div>
            <CardTitle className="text-xl">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="mb-4 space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href={product.href}>
              <Button className="w-full gap-2 group-hover:bg-primary">
                Get Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
