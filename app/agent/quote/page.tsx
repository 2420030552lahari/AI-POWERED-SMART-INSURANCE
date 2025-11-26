"use client"

import type React from "react"

import { useState } from "react"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockDelay } from "@/lib/api/mock-api"

export default function QuickQuotePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [quote, setQuote] = useState<number | null>(null)

  const handleGenerateQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await mockDelay(1500)

    // Mock quote calculation
    const baseAmount = Math.floor(Math.random() * 10000) + 8000
    setQuote(baseAmount)

    toast({
      title: "Quote Generated",
      description: "AI has calculated the optimal premium for this customer",
    })

    setIsLoading(false)
  }

  return (
    <AgentLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quick Quote Generator</h1>
          <p className="text-muted-foreground">Generate instant insurance quotes for your leads</p>
        </div>

        <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="flex items-start gap-4 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered Quote Engine</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes customer details and market data to provide accurate, competitive quotes instantly.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
            <CardDescription>Enter customer information to generate a quote</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerateQuote} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Customer name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="30" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insuranceType">Insurance Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="vehicle">Vehicle Insurance</SelectItem>
                    <SelectItem value="home">Home Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverage">Coverage Amount (₹)</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300000">₹3 Lakh</SelectItem>
                    <SelectItem value="500000">₹5 Lakh</SelectItem>
                    <SelectItem value="1000000">₹10 Lakh</SelectItem>
                    <SelectItem value="2500000">₹25 Lakh</SelectItem>
                    <SelectItem value="5000000">₹50 Lakh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Mumbai" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                <Calculator className="h-4 w-4" />
                {isLoading ? "Calculating..." : "Generate Quote"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {quote && (
          <Card className="border-2 border-primary">
            <CardHeader className="bg-primary/5">
              <CardTitle>Generated Quote</CardTitle>
              <CardDescription>Instant premium calculation</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Annual Premium</p>
                <p className="text-4xl font-bold text-primary">₹{quote.toLocaleString()}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  or ₹{Math.floor(quote / 12).toLocaleString()}/month
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Email Quote
                </Button>
                <Button className="flex-1">Send to Customer</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AgentLayout>
  )
}
