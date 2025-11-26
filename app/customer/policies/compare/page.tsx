"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Sparkles, Heart, Car, Home, Plane } from "lucide-react"
import { mockInsuranceProducts, type PolicyType } from "@/lib/api/mock-data/policies"
import { useToast } from "@/hooks/use-toast"
import { mockDelay } from "@/lib/api/mock-api"

export default function ComparePlansPage() {
  const t = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const [selectedType, setSelectedType] = useState<PolicyType>("health")
  const [isLoading, setIsLoading] = useState(false)

  const typeIcons = {
    health: Heart,
    life: Sparkles,
    vehicle: Car,
    home: Home,
    travel: Plane,
  }

  const filteredProducts = mockInsuranceProducts.filter((p) => p.type === selectedType)

  const handleBuy = async (productId: string) => {
    setIsLoading(true)
    await mockDelay(1000)
    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to payment page...",
    })
    router.push(`/customer/policies/buy/${productId}`)
    setIsLoading(false)
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{t.policies.compareQuotes}</h1>
          <p className="text-muted-foreground">Find the perfect insurance plan for your needs</p>
        </div>

        {/* AI Recommendation Banner */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">AI-Powered Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your profile to recommend the best insurance plans tailored to your needs and budget.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Plan Types Tabs */}
        <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as PolicyType)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="health" className="gap-2">
              <Heart className="h-4 w-4" />
              Health
            </TabsTrigger>
            <TabsTrigger value="life" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Life
            </TabsTrigger>
            <TabsTrigger value="vehicle" className="gap-2">
              <Car className="h-4 w-4" />
              Vehicle
            </TabsTrigger>
            <TabsTrigger value="home" className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {filteredProducts.map((product, index) => {
                const Icon = typeIcons[product.type]
                return (
                  <Card
                    key={product.id}
                    className={`border-2 transition-all hover:shadow-xl ${index === 1 ? "border-primary shadow-lg" : ""}`}
                  >
                    {index === 1 && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                        Recommended
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">₹{product.basePremium.toLocaleString()}</span>
                        <span className="text-muted-foreground">/year</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">Coverage Options</p>
                        <div className="flex flex-wrap gap-2">
                          {product.coverageOptions.map((coverage) => (
                            <Badge key={coverage} variant="outline">
                              ₹{(coverage / 100000).toFixed(1)}L
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-medium text-muted-foreground">Features</p>
                        <ul className="space-y-2">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className="w-full"
                        variant={index === 1 ? "default" : "outline"}
                        onClick={() => handleBuy(product.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? t.common.loading : t.policies.buyNow}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
