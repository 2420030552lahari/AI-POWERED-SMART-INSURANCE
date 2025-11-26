"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, User, Briefcase } from "lucide-react"
import Link from "next/link"
import { mockDelay } from "@/lib/api/mock-api"
import { useToast } from "@/hooks/use-toast"

export default function SignupPage() {
  const t = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const login = useAuthStore((state) => state.login)
  const [step, setStep] = useState<"role" | "details" | "otp">("role")
  const [selectedRole, setSelectedRole] = useState<"customer" | "agent" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleRoleSelect = (role: "customer" | "agent") => {
    setSelectedRole(role)
    setStep("details")
  }

  const handleSubmitDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    setUserDetails({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    })

    await mockDelay(1000)
    setStep("otp")
    toast({
      title: "OTP Sent",
      description: "Please enter the OTP sent to your mobile",
    })
    setIsLoading(false)
  }

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await mockDelay(1000)

    // Create new user with entered details
    const newUser = {
      id: `usr_${Date.now()}`,
      email: userDetails.email,
      name: userDetails.name,
      role: selectedRole || "customer",
      phone: userDetails.phone,
      kycStatus: "pending" as const,
    }

    login(newUser)

    toast({
      title: t.common.success,
      description: "Account created successfully",
    })
    router.push("/auth/kyc")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="w-full max-w-md border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t.auth.signupTitle}</CardTitle>
            <CardDescription>
              {step === "role" && t.auth.selectRole}
              {step === "details" && "Enter your details to create an account"}
              {step === "otp" && "Verify your mobile number"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "role" && (
              <div className="grid gap-4">
                <button
                  onClick={() => handleRoleSelect("customer")}
                  className="group flex items-center gap-4 rounded-xl border-2 p-6 text-left transition-all hover:border-primary hover:bg-accent"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.auth.customer}</h3>
                    <p className="text-sm text-muted-foreground">Get insurance coverage and manage policies</p>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("agent")}
                  className="group flex items-center gap-4 rounded-xl border-2 p-6 text-left transition-all hover:border-primary hover:bg-accent"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.auth.agent}</h3>
                    <p className="text-sm text-muted-foreground">Sell policies and earn commission</p>
                  </div>
                </button>
              </div>
            )}

            {step === "details" && (
              <form onSubmit={handleSubmitDetails} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Rahul Sharma" required disabled={isLoading} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.emailPlaceholder}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="rahul@example.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.auth.phonePlaceholder}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep("role")} disabled={isLoading}>
                    {t.common.back}
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? t.common.loading : t.common.next}
                  </Button>
                </div>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">{t.auth.otpPlaceholder}</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? t.common.loading : t.auth.verifyOTP}
                </Button>

                <Button type="button" variant="ghost" size="sm" className="w-full" disabled={isLoading}>
                  Resend OTP
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t.auth.alreadyHaveAccount} </span>
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                {t.common.login}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
