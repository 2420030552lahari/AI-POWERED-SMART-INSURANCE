"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, AlertCircle, TrendingUp } from "lucide-react"
import { mockUsers } from "@/lib/api/mock-data/users"
import { mockPolicies } from "@/lib/api/mock-data/policies"
import { mockClaims } from "@/lib/api/mock-data/claims"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { StatCard } from "@/components/ui/stat-card"
import { GradientText } from "@/components/ui/gradient-text"

export default function AdminDashboard() {
  const totalUsers = mockUsers.length
  const totalPolicies = mockPolicies.length
  const activeClaims = mockClaims.filter((c) => c.status === "under-review" || c.status === "pending").length
  const totalRevenue = mockPolicies.reduce((sum, p) => sum + p.premium, 0)

  const revenueData = [
    { month: "Jun", revenue: 450000 },
    { month: "Jul", revenue: 520000 },
    { month: "Aug", revenue: 680000 },
    { month: "Sep", revenue: 750000 },
    { month: "Oct", revenue: 820000 },
    { month: "Nov", revenue: 950000 },
  ]

  const policyDistribution = [
    { name: "Health", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Life", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Vehicle", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Home", value: 10, color: "hsl(var(--chart-4))" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 p-6 shadow-card">
          <h1 className="text-3xl font-bold">
            <GradientText variant="primary">Admin Dashboard</GradientText>
          </h1>
          <p className="text-muted-foreground">Platform overview and key metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            iconColor="text-primary"
          />
          <StatCard
            title="Active Policies"
            value={totalPolicies}
            change="+8% from last month"
            changeType="positive"
            icon={FileText}
            iconColor="text-success"
          />
          <StatCard
            title="Pending Claims"
            value={activeClaims}
            change="-5% from last month"
            changeType="positive"
            icon={AlertCircle}
            iconColor="text-warning"
          />
          <StatCard
            title="Monthly Revenue"
            value={`₹${(totalRevenue / 1000).toFixed(0)}K`}
            change="+15% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-accent"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-card hover-lift">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card hover-lift">
            <CardHeader>
              <CardTitle>Policy Distribution</CardTitle>
              <CardDescription>Breakdown by insurance type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={policyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {policyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New policy issued", user: "Rahul Sharma", time: "2 hours ago", variant: "success" },
                { action: "Claim approved", user: "Admin", time: "4 hours ago", variant: "info" },
                { action: "New user registered", user: "Priya Patel", time: "6 hours ago", variant: "default" },
                { action: "Lead converted", user: "Amit Verma (Agent)", time: "8 hours ago", variant: "success" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border bg-gradient-to-r from-muted/50 to-muted/30 p-4 last:mb-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
