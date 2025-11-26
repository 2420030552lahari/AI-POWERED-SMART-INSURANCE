"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const claimsData = [
  { month: "Jan", claims: 0 },
  { month: "Feb", claims: 1 },
  { month: "Mar", claims: 0 },
  { month: "Apr", claims: 2 },
  { month: "May", claims: 0 },
  { month: "Jun", claims: 1 },
  { month: "Jul", claims: 0 },
  { month: "Aug", claims: 0 },
  { month: "Sep", claims: 1 },
  { month: "Oct", claims: 0 },
  { month: "Nov", claims: 0 },
  { month: "Dec", claims: 0 },
]

const premiumData = [
  { year: "2021", amount: 42000 },
  { year: "2022", amount: 48000 },
  { year: "2023", amount: 55000 },
  { year: "2024", amount: 62000 },
]

const addOnData = [
  { name: "Zero Dep", count: 3 },
  { name: "Engine Protect", count: 2 },
  { name: "Roadside", count: 4 },
  { name: "NCB Protect", count: 2 },
]

export function ChartsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Claims Chart */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Claims Filed - Last 12 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={claimsData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="claims" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Premium Trend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Premium Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={premiumData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="year" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="amount" stroke="hsl(var(--accent))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Add-on Usage */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Add-on Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={addOnData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="name" type="category" className="text-xs" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--success))" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Score Gauge */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Vehicle Health Score</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
                className="opacity-20"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(var(--success))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(85 / 100) * 352} 352`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">85</span>
              <span className="text-xs text-muted-foreground">Excellent</span>
            </div>
          </div>
          <div className="mt-6 w-full space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Service</span>
              <span className="font-medium">2 months ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Odometer</span>
              <span className="font-medium">24,500 km</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
