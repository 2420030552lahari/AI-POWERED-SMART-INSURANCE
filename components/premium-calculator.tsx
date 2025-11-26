"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react"
import { GradientText } from "./ui/gradient-text"

interface PremiumCalculatorProps {
  type: "motor" | "health" | "travel" | "home"
}

export function PremiumCalculator({ type }: PremiumCalculatorProps) {
  const [step, setStep] = useState(1)
  const [premium, setPremium] = useState<number | null>(null)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const calculatePremium = () => {
    const basePremium = type === "motor" ? 7500 : type === "health" ? 12000 : type === "travel" ? 2500 : 15000
    const addonCost = selectedAddons.length * 1500
    setPremium(basePremium + addonCost)
    setStep(4)
  }

  const motorAddons = [
    { id: "zero-dep", name: "Zero Depreciation", price: 2500 },
    { id: "engine", name: "Engine Protect", price: 1800 },
    { id: "consumables", name: "Consumables Cover", price: 1200 },
    { id: "rti", name: "Return to Invoice", price: 3000 },
    { id: "roadside", name: "24x7 Roadside Assistance", price: 800 },
    { id: "ncb", name: "NCB Protection", price: 1500 },
  ]

  const healthAddons = [
    { id: "maternity", name: "Maternity Cover", price: 5000 },
    { id: "dental", name: "Dental Treatment", price: 2000 },
    { id: "opd", name: "OPD Cover", price: 3500 },
    { id: "critical", name: "Critical Illness", price: 4000 },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <GradientText variant="primary">Premium Calculator</GradientText>
            </CardTitle>
            <CardDescription>Get instant quote in 3 simple steps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                      step >= s ? "border-primary bg-primary text-white" : "border-muted bg-muted"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`h-1 w-16 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            {step === 1 && type === "motor" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vehicle Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-number">Vehicle Number</Label>
                    <Input id="vehicle-number" placeholder="MH01AB1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make">Make & Model</Label>
                    <Select>
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                        <SelectItem value="hyundai">Hyundai</SelectItem>
                        <SelectItem value="tata">Tata</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Registration Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel">Fuel Type</Label>
                    <Select>
                      <SelectTrigger id="fuel">
                        <SelectValue placeholder="Select fuel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="cng">CNG</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Input id="variant" placeholder="e.g., VXI, ZXI" />
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full gap-2">
                  Next: Owner Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 1 && type === "health" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="age">Your Age</Label>
                    <Input id="age" type="number" placeholder="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="members">Family Members</Label>
                    <Select>
                      <SelectTrigger id="members">
                        <SelectValue placeholder="Select members" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Individual</SelectItem>
                        <SelectItem value="2">Self + Spouse</SelectItem>
                        <SelectItem value="3">Self + Spouse + 1 Child</SelectItem>
                        <SelectItem value="4">Family Floater (4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sum-insured">Sum Insured</Label>
                    <Select>
                      <SelectTrigger id="sum-insured">
                        <SelectValue placeholder="Select amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300000">₹3 Lakh</SelectItem>
                        <SelectItem value="500000">₹5 Lakh</SelectItem>
                        <SelectItem value="1000000">₹10 Lakh</SelectItem>
                        <SelectItem value="2000000">₹20 Lakh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full gap-2">
                  Next: Contact Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Owner/Personal Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                </div>
                <Button onClick={() => setStep(3)} className="w-full gap-2">
                  Next: Add-ons
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Select Add-ons (Optional)</h3>
                <div className="space-y-3">
                  {(type === "motor" ? motorAddons : healthAddons).map((addon) => (
                    <Card key={addon.id} className="border">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAddons([...selectedAddons, addon.id])
                              } else {
                                setSelectedAddons(selectedAddons.filter((id) => id !== addon.id))
                              }
                            }}
                          />
                          <Label htmlFor={addon.id} className="cursor-pointer font-medium">
                            {addon.name}
                          </Label>
                        </div>
                        <Badge variant="secondary">+₹{addon.price}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button onClick={calculatePremium} className="w-full gap-2">
                  Calculate Premium
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 4 && premium && (
              <div className="space-y-6 text-center">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                  <p className="mb-2 text-sm text-muted-foreground">Your Premium</p>
                  <p className="mb-1 text-5xl font-bold text-primary">₹{premium.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">/year</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span>Best price guaranteed • Instant policy issuance</span>
                </div>
                <Button size="lg" className="w-full gap-2">
                  Proceed to Buy
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => setStep(1)} className="w-full">
                  Recalculate
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-white p-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Comprehensive Plan</p>
                <p className="text-muted-foreground">Recommended for you</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Why this plan?</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Best value for money
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Maximum coverage
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Matches your profile
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Claim Settlement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">98.5%</p>
              <p className="text-sm text-muted-foreground">Settlement Ratio</p>
              <Badge className="mt-2" variant="secondary">
                IRDAI Certified
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
