"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { mockUsers } from "@/lib/api/mock-data/users"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { mockDelay } from "@/lib/api/mock-api"

export default function LoginPage() {
  const t = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const login = useAuthStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)
  const [useOTP, setUseOTP] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    await mockDelay(1000)

    // Mock login - use first customer user
    const user = mockUsers.find((u) => u.role === "customer")
    if (user) {
      login(user)
      toast({
        title: t.common.success,
        description: "Successfully logged in",
      })
      router.push("/customer/dashboard")
    }

    setIsLoading(false)
  }

  const handleSendOTP = async () => {
    setIsLoading(true)
    await mockDelay(1000)
    setOtpSent(true)
    toast({
      title: "OTP Sent",
      description: "Please enter the OTP sent to your mobile",
    })
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
            <CardTitle className="text-2xl">{t.auth.loginTitle}</CardTitle>
            <CardDescription>Enter your details to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.auth.phonePlaceholder}</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required disabled={isLoading} />
              </div>

              {!otpSent ? (
                <Button type="button" onClick={handleSendOTP} className="w-full" disabled={isLoading}>
                  {isLoading ? t.common.loading : t.auth.sendOTP}
                </Button>
              ) : (
                <>
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t.auth.rememberMe}
                    </label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t.common.loading : t.auth.verifyOTP}
                  </Button>

                  <Button type="button" variant="ghost" size="sm" onClick={handleSendOTP} className="w-full">
                    Resend OTP
                  </Button>
                </>
              )}
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t.auth.dontHaveAccount} </span>
              <Link href="/auth/signup" className="font-medium text-primary hover:underline">
                {t.common.signup}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-4 text-sm text-muted-foreground">
          <Link href="/help">Help & Support</Link>
          <span>•</span>
          <Link href="/legal/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link href="/legal/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
  )
}
