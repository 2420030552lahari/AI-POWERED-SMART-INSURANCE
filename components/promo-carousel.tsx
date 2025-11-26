"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Gift, Percent, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const promos = [
    {
      icon: Percent,
      title: "Diwali Special Offer",
      description: "Get 25% OFF on all health insurance plans",
      code: "DIWALI25",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Gift,
      title: "New Year Bonanza",
      description: "Buy motor insurance & get roadside assistance FREE",
      code: "NEWYEAR",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Sparkles,
      title: "First-time Buyer",
      description: "Extra 15% discount for new customers",
      code: "FIRST15",
      color: "from-green-500 to-teal-600",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [promos.length])

  const promo = promos[currentSlide]

  return (
    <Card className={`relative overflow-hidden border-2 bg-gradient-to-r ${promo.color} text-white shadow-xl`}>
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <promo.icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="mb-1 text-2xl font-bold">{promo.title}</h3>
            <p className="text-sm leading-relaxed text-white/90">{promo.description}</p>
            <Badge className="mt-2 bg-white/20 text-white backdrop-blur-sm">Code: {promo.code}</Badge>
          </div>
        </div>
        <Button variant="secondary" className="gap-2 shadow-lg">
          Claim Offer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </Card>
  )
}
