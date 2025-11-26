"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, FileText } from "lucide-react"
import Link from "next/link"
import { mockPolicies, type PolicyStatus } from "@/lib/api/mock-data/policies"
import { PolicyCard } from "@/components/ui/policy-card"

export default function PoliciesPage() {
  const t = useTranslation()
  const user = useAuthStore((state) => state.user)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<PolicyStatus | "all">("all")

  const userPolicies = mockPolicies.filter((p) => p.userId === user?.id)

  const activePolicies = userPolicies.filter((p) => p.status === "active")
  const expiredPolicies = userPolicies.filter((p) => p.status === "expired")
  const pendingPolicies = userPolicies.filter((p) => p.status === "pending")

  // Calculate upcoming renewals (policies expiring in next 60 days)
  const upcomingRenewals = userPolicies.filter((p) => {
    const daysToExpiry = Math.ceil((new Date(p.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysToExpiry > 0 && daysToExpiry <= 60 && p.status === "active"
  })

  const filteredPolicies = userPolicies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = activeTab === "all" || policy.status === activeTab
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: userPolicies.length,
    active: activePolicies.length,
    totalCoverage: userPolicies.reduce((sum, p) => sum + p.coverageAmount, 0),
    totalPremium: userPolicies.reduce((sum, p) => sum + p.premium, 0),
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t.policies.myPolicies}</h1>
            <p className="text-muted-foreground">Manage and view all your insurance policies</p>
          </div>
          <Link href="/customer/policies/compare">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t.policies.getPolicies}
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Policies</div>
              <div className="mt-1 text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Active Policies</div>
              <div className="mt-1 text-2xl font-bold text-success">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Coverage</div>
              <div className="mt-1 text-2xl font-bold">₹{(stats.totalCoverage / 10000000).toFixed(1)}Cr</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Annual Premium</div>
              <div className="mt-1 text-2xl font-bold">₹{stats.totalPremium.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search policies by name or policy number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PolicyStatus | "all")} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({userPolicies.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activePolicies.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({expiredPolicies.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingPolicies.length})</TabsTrigger>
            <TabsTrigger value="renewal" onClick={() => setActiveTab("all")}>
              Renewals ({upcomingRenewals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {activeTab === "renewal" ? (
              // Show upcoming renewals
              upcomingRenewals.length > 0 ? (
                upcomingRenewals.map((policy) => <PolicyCard key={policy.id} policy={policy} />)
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 font-semibold">No upcoming renewals</h3>
                    <p className="text-sm text-muted-foreground">All your policies are valid for more than 60 days</p>
                  </CardContent>
                </Card>
              )
            ) : // Show filtered policies
            filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => <PolicyCard key={policy.id} policy={policy} />)
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">No policies found</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {searchQuery ? "Try adjusting your search" : "Get started by comparing insurance plans"}
                  </p>
                  <Link href="/customer/policies/compare">
                    <Button>{t.policies.compareQuotes}</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
