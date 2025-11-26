"use client"

import { useTranslation } from "@/lib/i18n/use-translation"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Clock, CheckCircle } from "lucide-react"
import { mockCommissions } from "@/lib/api/mock-data/agents"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function CommissionPage() {
  const t = useTranslation()

  const totalCommission = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0)
  const paidCommission = mockCommissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0)
  const pendingCommission = totalCommission - paidCommission

  const monthlyCommission = [
    { month: "Jul", amount: 12000 },
    { month: "Aug", amount: 18000 },
    { month: "Sep", amount: 22500 },
    { month: "Oct", amount: 27000 },
    { month: "Nov", amount: 33000 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-success/10 text-success"
      case "processing":
        return "bg-info/10 text-info"
      default:
        return "bg-warning/10 text-warning"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return CheckCircle
      case "processing":
        return TrendingUp
      default:
        return Clock
    }
  }

  return (
    <AgentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t.nav.commission}</h1>
          <p className="text-muted-foreground">Track your earnings and commission payments</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Commission</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">₹{paidCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Received to date</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">₹{pendingCommission.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Awaiting payment</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Commission Trend</CardTitle>
            <CardDescription>Your earnings over the last 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyCommission}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
            <CardDescription>Detailed breakdown of your commission payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCommissions.map((commission) => {
              const StatusIcon = getStatusIcon(commission.status)
              return (
                <div key={commission.id} className="flex items-start justify-between rounded-xl border bg-muted/50 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{commission.policyNumber}</h3>
                      <Badge variant="outline" className={getStatusColor(commission.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {commission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{commission.customerName}</p>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <span>{commission.policyType}</span>
                      <span>•</span>
                      <span>Premium: ₹{commission.premium.toLocaleString()}</span>
                      <span>•</span>
                      <span>Rate: {commission.commissionRate}%</span>
                      {commission.paidDate && (
                        <>
                          <span>•</span>
                          <span>Paid: {commission.paidDate}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{commission.commissionAmount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Commission</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
