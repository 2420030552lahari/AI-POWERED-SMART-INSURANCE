"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shield, CheckCircle, ArrowRight, Download, Smartphone, CreditCard, Banknote, Wallet } from "lucide-react"
import { GradientText } from "@/components/ui/gradient-text"
import confetti from "canvas-confetti"
import { downloadInvoice, type InvoiceData } from "@/lib/utils/invoice-generator"

export default function BuyPolicyPage() {
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 5500,
      idv: "₹6 Lakh",
      features: ["Third Party Liability", "Personal Accident Cover", "24x7 Support"],
      addons: [],
    },
    {
      id: "standard",
      name: "Standard",
      price: 8500,
      idv: "₹8 Lakh",
      features: ["Own Damage Cover", "Third Party Liability", "Personal Accident", "Roadside Assistance"],
      addons: ["Basic RSA"],
      badge: "Best Value",
    },
    {
      id: "comprehensive",
      name: "Comprehensive",
      price: 12500,
      idv: "₹10 Lakh",
      features: [
        "Zero Depreciation",
        "Engine Protection",
        "Consumables Cover",
        "NCB Protection",
        "Return to Invoice",
        "24x7 Premium Roadside Assistance",
      ],
      addons: ["Zero Dep", "Engine Protect", "RSA", "NCB Protection"],
      badge: "Recommended",
      popular: true,
    },
  ]

  const comparisonFeatures = [
    { name: "IDV (Insured Declared Value)", basic: "₹6 Lakh", standard: "₹8 Lakh", comprehensive: "₹10 Lakh" },
    { name: "Own Damage Cover", basic: false, standard: true, comprehensive: true },
    { name: "Zero Depreciation", basic: false, standard: false, comprehensive: true },
    { name: "Engine Protection", basic: false, standard: false, comprehensive: true },
    { name: "Roadside Assistance", basic: false, standard: true, comprehensive: true },
    { name: "NCB Protection", basic: false, standard: false, comprehensive: true },
    { name: "Consumables Cover", basic: false, standard: false, comprehensive: true },
    { name: "Return to Invoice", basic: false, standard: false, comprehensive: true },
  ]

  const handlePolicyIssued = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleDownloadInvoice = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan)
    if (!selectedPlanData) return

    const invoiceData: InvoiceData = {
      policyNumber: "POL/2024/MI/123456",
      policyType: "Motor Insurance",
      customerName: "John Doe", // In real app, get from form
      customerEmail: "john.doe@example.com",
      customerPhone: "+91 98765 43210",
      customerAddress: "123, MG Road, Mumbai, Maharashtra 400001",
      planName: selectedPlanData.name,
      premium: selectedPlanData.price,
      gst: 18,
      discount: 0,
      issueDate: new Date().toISOString(),
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      idv: selectedPlanData.idv,
      addons: selectedPlanData.addons
    }

    downloadInvoice(invoiceData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                <GradientText variant="primary">Buy Motor Insurance</GradientText>
              </h1>
              <p className="text-muted-foreground">Complete your purchase in 4 simple steps</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold transition-all ${step >= s ? "border-primary bg-primary text-white" : "border-muted bg-white"
                  }`}
              >
                {step > s ? <CheckCircle className="h-6 w-6" /> : s}
              </div>
              {s < 5 && <div className={`h-1 w-16 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Step 1: Enter Vehicle Details</CardTitle>
                <CardDescription>Provide your vehicle information to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-number">Vehicle Registration Number</Label>
                    <Input id="vehicle-number" placeholder="MH01AB1234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Registration City</Label>
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
                    <Label htmlFor="fuel">Fuel Type</Label>
                    <Select>
                      <SelectTrigger id="fuel">
                        <SelectValue placeholder="Select fuel type" />
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
                    <Label htmlFor="make">Make & Model</Label>
                    <Select>
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maruti">Maruti Suzuki Swift</SelectItem>
                        <SelectItem value="hyundai">Hyundai i20</SelectItem>
                        <SelectItem value="tata">Tata Nexon</SelectItem>
                        <SelectItem value="honda">Honda City</SelectItem>
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
                </div>
                <Button onClick={() => setStep(2)} className="mt-6 gap-2">
                  Next: Compare Plans
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-center text-3xl font-bold">
                <GradientText variant="accent">Step 2: Compare & Choose Your Plan</GradientText>
              </h2>
              <div className="mb-8 grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer border-2 transition-all hover:-translate-y-1 ${selectedPlan === plan.id ? "border-primary shadow-xl" : ""
                      } ${plan.popular ? "scale-105" : ""}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-white">{plan.badge}</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-muted-foreground">/year</span>
                      </div>
                      <div className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
                        IDV: {plan.idv}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-4 space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === plan.id && (
                        <div className="mt-4 rounded-lg bg-primary/10 p-2 text-center text-sm font-medium text-primary">
                          Selected
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Detailed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left font-semibold">Features</th>
                          <th className="p-3 text-center font-semibold">Basic</th>
                          <th className="p-3 text-center font-semibold">Standard</th>
                          <th className="p-3 text-center font-semibold">Comprehensive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonFeatures.map((feature, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3 text-sm">{feature.name}</td>
                            <td className="p-3 text-center">
                              {typeof feature.basic === "boolean" ? (
                                feature.basic ? (
                                  <CheckCircle className="mx-auto h-5 w-5 text-success" />
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )
                              ) : (
                                <span className="font-medium">{feature.basic}</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {typeof feature.standard === "boolean" ? (
                                feature.standard ? (
                                  <CheckCircle className="mx-auto h-5 w-5 text-success" />
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )
                              ) : (
                                <span className="font-medium">{feature.standard}</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {typeof feature.comprehensive === "boolean" ? (
                                feature.comprehensive ? (
                                  <CheckCircle className="mx-auto h-5 w-5 text-success" />
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )
                              ) : (
                                <span className="font-medium">{feature.comprehensive}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => setStep(3)} disabled={!selectedPlan} size="lg" className="gap-2">
                  Continue to Proposal Form
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Step 3: Fill Proposal Form</CardTitle>
                <CardDescription>Please provide your details to proceed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-4 font-semibold">Owner Profile</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan">PAN Card Number</Label>
                      <Input id="pan" placeholder="ABCDE1234F" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhaar Number</Label>
                      <Input id="aadhar" placeholder="1234 5678 9012" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Communication Address</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Address Line 1</Label>
                      <Input id="address" placeholder="Enter address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city-address">City</Label>
                      <Input id="city-address" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="400001" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 font-semibold">Nominee Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nominee-name">Nominee Name</Label>
                      <Input id="nominee-name" placeholder="Enter nominee name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select>
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the terms and conditions, privacy policy, and declare that the information provided is
                    accurate
                  </Label>
                </div>

                <Button onClick={() => setStep(4)} className="w-full gap-2">
                  Proceed to Payment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="mx-auto max-w-2xl space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Step 4: Payment</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 p-6">
                  <div className="mb-2 text-sm text-muted-foreground">Total Premium</div>
                  <div className="text-4xl font-bold text-primary">
                    ₹{selectedPlan === "basic" ? "5,500" : selectedPlan === "standard" ? "8,500" : "12,500"}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Inclusive of all taxes</div>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <Card className={`cursor-pointer border-2 ${paymentMethod === "upi" ? "border-primary" : ""}`}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Smartphone className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-semibold">UPI Payment</div>
                          <div className="text-xs text-muted-foreground">GPay, PhonePe, Paytm</div>
                        </div>
                      </Label>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer border-2 ${paymentMethod === "card" ? "border-primary" : ""}`}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-3">
                        <CreditCard className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-semibold">Credit/Debit Card</div>
                          <div className="text-xs text-muted-foreground">Visa, Mastercard, RuPay</div>
                        </div>
                      </Label>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer border-2 ${paymentMethod === "netbanking" ? "border-primary" : ""}`}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Banknote className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-semibold">Net Banking</div>
                          <div className="text-xs text-muted-foreground">All major banks</div>
                        </div>
                      </Label>
                    </CardContent>
                  </Card>

                  <Card className={`cursor-pointer border-2 ${paymentMethod === "wallet" ? "border-primary" : ""}`}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Wallet className="h-6 w-6 text-primary" />
                        <div>
                          <div className="font-semibold">Wallets</div>
                          <div className="text-xs text-muted-foreground">Paytm, Amazon Pay, Mobikwik</div>
                        </div>
                      </Label>
                    </CardContent>
                  </Card>
                </RadioGroup>

                <Button
                  onClick={() => {
                    setStep(5)
                    setTimeout(handlePolicyIssued, 500)
                  }}
                  disabled={!paymentMethod}
                  className="mt-6 w-full gap-2"
                  size="lg"
                >
                  Pay Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 5 && (
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-success">
              <CardContent className="space-y-6 p-12 text-center">
                <div className="mx-auto inline-flex rounded-full bg-success/10 p-6">
                  <CheckCircle className="h-20 w-20 text-success" />
                </div>
                <div>
                  <h2 className="mb-2 text-3xl font-bold">
                    <GradientText variant="primary">Policy Issued Successfully!</GradientText>
                  </h2>
                  <p className="text-muted-foreground">Your motor insurance policy is now active</p>
                </div>

                <Card className="border bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Policy Number</span>
                        <span className="font-semibold">POL/2024/MI/123456</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan Type</span>
                        <span className="font-semibold capitalize">{selectedPlan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Premium Paid</span>
                        <span className="font-semibold">
                          ₹{selectedPlan === "basic" ? "5,500" : selectedPlan === "standard" ? "8,500" : "12,500"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Policy Period</span>
                        <span className="font-semibold">1 Year</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-col gap-3">
                  <Button size="lg" className="gap-2" onClick={handleDownloadInvoice}>
                    <Download className="h-5 w-5" />
                    Download Policy PDF
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Smartphone className="h-5 w-5" />
                    Add to Digital Wallet
                  </Button>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 text-sm">
                  <p className="font-medium text-blue-900">Policy document has been sent to your email</p>
                  <p className="text-blue-700">You can access it anytime from your customer portal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
