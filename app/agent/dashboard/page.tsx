"use client"

import { useTranslation } from "@/lib/i18n/use-translation"
import { AgentLayout } from "@/components/layouts/agent-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, FileText, Target, ArrowRight, Phone } from "lucide-react"
import Link from "next/link"
import { mockLeads, mockCommissions } from "@/lib/api/mock-data/agents"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { GradientText } from "@/components/ui/gradient-text"

export default function AgentDashboard() {
  const t = useTranslation()

  const newLeads = mockLeads.filter((l) => l.status === "new").length
  const convertedLeads = mockLeads.filter((l) => l.status === "converted").length
  const conversionRate = ((convertedLeads / mockLeads.length) * 100).toFixed(1)

  const totalCommission = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0)
  const paidCommission = mockCommissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0)

  const monthlyData = [
    { month: "Jul", sales: 8, commission: 12000 },
    { month: "Aug", sales: 12, commission: 18000 },
    { month: "Sep", sales: 15, commission: 22500 },
    { month: "Oct", sales: 18, commission: 27000 },
    { month: "Nov", sales: 22, commission: 33000 },
  ]

  return (
    <AgentLayout>
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 p-6 shadow-card">
          <h1 className="text-3xl font-bold">
            <GradientText variant="primary">{t.common.welcome} Back!</GradientText>
          </h1>
          <p className="text-muted-foreground">Here's your performance overview</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="New Leads"
            value={newLeads}
            change="+5 this week"
            changeType="positive"
            icon={Users}
            iconColor="text-primary"
          />
          <StatCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            change="+3% vs last month"
            changeType="positive"
            icon={Target}
            iconColor="text-success"
          />
          <StatCard
            title="Total Commission"
            value={`₹${totalCommission.toLocaleString()}`}
            change="+₹12K this month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-accent"
          />
          <StatCard
            title="Paid Commission"
            value={`₹${paidCommission.toLocaleString()}`}
            change="80% of total"
            changeType="neutral"
            icon={FileText}
            iconColor="text-info"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card hover-lift">
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Sales and commission over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Leads</CardTitle>
                <Link href="/agent/leads">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLeads.slice(0, 4).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-start justify-between rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4 transition-all hover:shadow-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{lead.name}</h3>
                      <StatusBadge
                        variant={lead.status === "converted" ? "success" : lead.status === "new" ? "info" : "warning"}
                        withDot
                      >
                        {lead.status}
                      </StatusBadge>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </span>
                      <span className="capitalize">{lead.type} Insurance</span>
                    </div>
                  </div>
                  <Link href={`/agent/leads/${lead.id}`}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to boost your productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/agent/leads?filter=new">
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-3 p-6 hover-lift transition-smooth bg-transparent"
                >
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Follow Up Leads</span>
                </Button>
              </Link>
              <Link href="/agent/quote">
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-3 p-6 hover-lift transition-smooth bg-transparent"
                >
                  <div className="rounded-xl bg-accent/10 p-3">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-sm font-medium">Generate Quote</span>
                </Button>
              </Link>
              <Link href="/agent/customers">
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-3 p-6 hover-lift transition-smooth bg-transparent"
                >
                  <div className="rounded-xl bg-success/10 p-3">
                    <Target className="h-6 w-6 text-success" />
                  </div>
                  <span className="text-sm font-medium">View Customers</span>
                </Button>
              </Link>
              <Link href="/agent/commission">
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-3 p-6 hover-lift transition-smooth bg-transparent"
                >
                  <div className="rounded-xl bg-warning/10 p-3">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                  <span className="text-sm font-medium">Track Commission</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
