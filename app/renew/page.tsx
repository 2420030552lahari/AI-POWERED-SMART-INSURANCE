"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/ui/empty-state"
import { Progress } from "@/components/ui/progress"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Gift,
  TrendingDown,
  Shield,
  RefreshCw,
  FileText,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

type RenewalPolicy = {
  id: string
  policyNumber: string
  type: string
  name: string
  currentPremium: number
  renewalPremium: number
  expiryDate: string
  daysLeft: number
  ncbDiscount: number
  status: "due-soon" | "expiring-soon" | "expired" | "renewed"
}

export default function RenewPage() {
  const [activeTab, setActiveTab] = useState<"due-soon" | "all" | "history">("due-soon")

  const mockRenewals: RenewalPolicy[] = [
    {
      id: "pol_001",
      policyNumber: "HLT/2024/001234",
      type: "Health",
      name: "Comprehensive Health Insurance",
      currentPremium: 15000,
      renewalPremium: 13500,
      expiryDate: "2024-12-31",
      daysLeft: 36,
      ncbDiscount: 10,
      status: "due-soon",
    },
    {
      id: "pol_002",
      policyNumber: "CAR/2024/005678",
      type: "Motor",
      name: "Car Insurance - Honda City",
      currentPremium: 8500,
      renewalPremium: 7650,
      expiryDate: "2025-01-15",
      daysLeft: 51,
      ncbDiscount: 10,
      status: "due-soon",
    },
  ]

  const dueSoonPolicies = mockRenewals.filter((p) => p.status === "due-soon")

  const RenewalCard = ({ policy }: { policy: RenewalPolicy }) => {
    const isUrgent = policy.daysLeft <= 30
    const savingsAmount = policy.currentPremium - policy.renewalPremium

    return (
      <Card className="shadow-lg rounded-3xl hover:shadow-xl transition-all">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div
                className={`rounded-full p-3 ${policy.type === "Health" ? "bg-red-100" : "bg-blue-100"
                  }`}
              >
                <Shield
                  className={`h-6 w-6 ${policy.type === "Health" ? "text-red-600" : "text-blue-600"
                    }`}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{policy.name}</h3>
                <p className="text-sm text-muted-foreground">Policy #{policy.policyNumber}</p>
                <Badge variant="outline" className="mt-2">
                  {policy.type}
                </Badge>
              </div>
            </div>
            {isUrgent && (
              <Badge className="bg-red-100 text-red-700 border-red-200">
                <AlertCircle className="h-3 w-3 mr-1" />
                Urgent
              </Badge>
            )}
          </div>

          {/* Expiry Alert */}
          <div
            className={`p-4 rounded-xl mb-4 ${isUrgent ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"
              }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar
                className={`h-4 w-4 ${isUrgent ? "text-red-600" : "text-amber-600"}`}
              />
              <span className={`font-semibold ${isUrgent ? "text-red-700" : "text-amber-700"}`}>
                Expires in {policy.daysLeft} days
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Valid until: {new Date(policy.expiryDate).toLocaleDateString("en-IN")}
            </p>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Current Premium</span>
              <span className="font-semibold">₹{policy.currentPremium.toLocaleString()}</span>
            </div>
            {policy.ncbDiscount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="flex items-center gap-1">
                  <Gift className="h-4 w-4" />
                  No Claim Bonus ({policy.ncbDiscount}%)
                </span>
                <span className="font-semibold">-₹{(policy.currentPremium * policy.ncbDiscount / 100).toLocaleString()}</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-semibold">Renewal Premium</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ₹{policy.renewalPremium.toLocaleString()}
                </div>
                {savingsAmount > 0 && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingDown className="h-3 w-3" />
                    Save ₹{savingsAmount.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits Reminder */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mb-4">
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              Continue Your Benefits
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Maintain No Claim Bonus</li>
              <li>• No waiting period</li>
              <li>• Existing coverage continues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Link href={`/customer/policies/${policy.id}`} className="flex-1">
              <Button variant="outline" className="w-full rounded-xl" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                View Policy
              </Button>
            </Link>
            <Link href={`/renew/${policy.id}`} className="flex-1">
              <Button className="w-full rounded-xl" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Renew Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Policy Renewals</h1>
          <p className="text-muted-foreground">
            Manage your policy renewals and maintain continuous coverage
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Expiring Soon</div>
                  <div className="text-3xl font-bold">{dueSoonPolicies.filter((p) => p.daysLeft <= 30).length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Due in 60 Days</div>
                  <div className="text-3xl font-bold">{dueSoonPolicies.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Gift className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Savings</div>
                  <div className="text-3xl font-bold">
                    ₹{dueSoonPolicies.reduce((sum, p) => sum + (p.currentPremium - p.renewalPremium), 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="due-soon" className="rounded-xl">
              Due Soon ({dueSoonPolicies.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-xl">
              All Policies
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl">
              Renewal History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="due-soon" className="space-y-4 mt-6">
            {dueSoonPolicies.length > 0 ? (
              dueSoonPolicies.map((policy) => <RenewalCard key={policy.id} policy={policy} />)
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="All Caught Up!"
                description="You don't have any policies expiring in the next 60 days."
                actionLabel="View All Policies"
                actionHref="/customer/policies"
              />
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {mockRenewals.map((policy) => (
              <RenewalCard key={policy.id} policy={policy} />
            ))}
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <EmptyState
              icon={RefreshCw}
              title="No Renewal History"
              description="Your renewal history will appear here once you renew your first policy."
            />
          </TabsContent>
        </Tabs>

        {/* Renewal Tips */}
        <Card className="shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Renewal Tips & Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Renew Early</h4>
                  <p className="text-sm text-muted-foreground">
                    Renew 30-45 days before expiry to avoid lapses and enjoy grace period benefits
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">No Claim Bonus</h4>
                  <p className="text-sm text-muted-foreground">
                    Get up to 50% discount on premium with consecutive claim-free years
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <TrendingDown className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Compare Plans</h4>
                  <p className="text-sm text-muted-foreground">
                    Review coverage options and potentially save more on renewal
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-white p-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Avoid Lapse</h4>
                  <p className="text-sm text-muted-foreground">
                    Late renewal may lead to loss of NCB and waiting periods for claims
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
