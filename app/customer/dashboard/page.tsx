"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import {
  FileText,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowRight,
  Shield,
  Bell,
  RefreshCw,
  ShoppingBag,
} from "lucide-react"
import Link from "next/link"
import { mockPolicies } from "@/lib/api/mock-data/policies"
import { mockClaims } from "@/lib/api/mock-data/claims"

export default function CustomerDashboard() {
  const t = useTranslation()
  const user = useAuthStore((state) => state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const userPolicies = mockPolicies.filter((p) => p.userId === user?.id)
  const activePolicies = userPolicies.filter((p) => p.status === "active")
  const upcomingRenewals = userPolicies.filter((p) => {
    const daysToExpiry = Math.ceil((new Date(p.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysToExpiry > 0 && daysToExpiry <= 60
  })
  const userClaims = mockClaims.filter((c) => c.userId === user?.id)
  const pendingClaims = userClaims.filter((c) => c.status === "pending" || c.status === "under-review")

  const currentYear = new Date().getFullYear()
  const premiumThisYear = userPolicies
    .filter((p) => new Date(p.startDate).getFullYear() === currentYear)
    .reduce((sum, p) => sum + p.premium, 0)

  const totalPremium = userPolicies.reduce((sum, p) => sum + p.premium, 0)

  // Loading Skeleton
  if (loading) {
    return (
      <CustomerLayout>
        <div className="space-y-6">
          <Skeleton className="h-24 rounded-xl" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-96 rounded-3xl" />
            <Skeleton className="h-96 rounded-3xl" />
          </div>
        </div>
      </CustomerLayout>
    )
  }

  // Empty State - No Policies
  if (userPolicies.length === 0) {
    return (
      <CustomerLayout>
        <div className="space-y-6">
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 shadow-card">
            <h1 className="text-3xl font-bold">
              {t.common.welcome}, {user?.name?.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground">Let's get you started with your first insurance policy</p>
          </div>

          <EmptyState
            icon={ShoppingBag}
            title="No Insurance Policies Yet"
            description="Protect what matters most. Explore our insurance products and find the perfect coverage for you and your family."
            actionLabel="Explore Products"
            actionHref="/products"
          />

          {/* Quick Start Guide */}
          <Card className="shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Getting Started with Smart Insurance</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white p-2">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">1. Browse Products</h4>
                    <p className="text-sm text-muted-foreground">
                      Explore our range of insurance products
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white p-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">2. Get a Quote</h4>
                    <p className="text-sm text-muted-foreground">
                      Compare plans and get instant quotes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white p-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">3. Buy Online</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete purchase in minutes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 shadow-card">
          <h1 className="text-3xl font-bold">
            {t.common.welcome}, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">Here's your insurance overview for today</p>
        </div>

        {/* Renewal Alert */}
        {upcomingRenewals.length > 0 && (
          <Card className="border-l-4 border-l-amber-500 bg-amber-50/50 shadow-lg rounded-3xl">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-amber-100 p-3">
                <Bell className="h-6 w-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Policy Renewal Alert</h3>
                <p className="text-sm text-muted-foreground">
                  You have {upcomingRenewals.length} {upcomingRenewals.length === 1 ? "policy" : "policies"} expiring
                  soon
                </p>
              </div>
              <Link href="/renew">
                <Button size="sm" className="gap-2 rounded-xl">
                  <RefreshCw className="h-4 w-4" />
                  Renew Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Active Policies</div>
                  <div className="text-3xl font-bold">{activePolicies.length}</div>
                  <div className="text-xs text-muted-foreground">{userPolicies.length} total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <RefreshCw className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Upcoming Renewals</div>
                  <div className="text-3xl font-bold">{upcomingRenewals.length}</div>
                  <div className="text-xs text-muted-foreground">In next 60 days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pending Claims</div>
                  <div className="text-3xl font-bold">{pendingClaims.length}</div>
                  <div className="text-xs text-muted-foreground">
                    ₹{pendingClaims.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Premium Paid</div>
                  <div className="text-2xl font-bold">₹{premiumThisYear.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">This year</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Policies & Claims */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Active Policies */}
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Active Policies</h3>
                <Link href="/customer/policies">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {activePolicies.slice(0, 3).map((policy) => (
                  <Link key={policy.id} href={`/customer/policies/${policy.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{policy.name}</p>
                        <p className="text-xs text-muted-foreground">₹{policy.premium.toLocaleString()}/year</p>
                      </div>
                      <div className="text-xs text-green-600 font-semibold">Active</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Claims */}
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Recent Claims</h3>
                <Link href="/customer/claims">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {userClaims.length > 0 ? (
                <div className="space-y-3">
                  {userClaims.slice(0, 3).map((claim) => (
                    <Link key={claim.id} href={`/customer/claims/${claim.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="rounded-full bg-amber-100 p-2">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{claim.description}</p>
                          <p className="text-xs text-muted-foreground">₹{claim.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-xs text-amber-600 font-semibold capitalize">{claim.status}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-3">No claims filed yet</p>
                  <Link href="/customer/claims">
                    <Button size="sm" variant="outline" className="rounded-xl">
                      File a Claim
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/products">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 rounded-xl">
                  <ShoppingBag className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Buy Insurance</div>
                    <div className="text-xs text-muted-foreground">Explore products</div>
                  </div>
                </Button>
              </Link>
              <Link href="/customer/claims">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 rounded-xl">
                  <FileText className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">File Claim</div>
                    <div className="text-xs text-muted-foreground">Submit new claim</div>
                  </div>
                </Button>
              </Link>
              <Link href="/renew">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 rounded-xl">
                  <RefreshCw className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Renew Policy</div>
                    <div className="text-xs text-muted-foreground">Check renewals</div>
                  </div>
                </Button>
              </Link>
              <Link href="/customer/support">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4 rounded-xl">
                  <Bell className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">Get Help</div>
                    <div className="text-xs text-muted-foreground">Contact support</div>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
