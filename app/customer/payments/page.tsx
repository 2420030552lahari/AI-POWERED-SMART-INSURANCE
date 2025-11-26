"use client"

import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CreditCard, CheckCircle, Clock, AlertCircle, Search, Download } from "lucide-react"
import { mockPayments } from "@/lib/api/mock-data/payments"
import { useState } from "react"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPayments = mockPayments.filter(
    (payment) =>
      payment.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = {
    upcoming: mockPayments.filter((p) => p.status === "upcoming").length,
    paid: mockPayments.filter((p) => p.status === "paid").length,
    overdue: mockPayments.filter((p) => p.status === "overdue").length,
    totalUpcoming: mockPayments.filter((p) => p.status === "upcoming").reduce((sum, p) => sum + p.amount, 0),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            <CheckCircle className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        )
      case "upcoming":
        return (
          <Badge variant="outline" className="bg-info/10 text-info border-info/20">
            <Clock className="mr-1 h-3 w-3" />
            Upcoming
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            <AlertCircle className="mr-1 h-3 w-3" />
            Overdue
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your premium payments and billing history</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">₹{stats.totalUpcoming.toLocaleString()} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.paid}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.overdue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Auto-Pay Enabled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">policies</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search payments by policy name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download Statement
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        payment.status === "paid"
                          ? "bg-success/10"
                          : payment.status === "overdue"
                            ? "bg-destructive/10"
                            : "bg-primary/10"
                      }`}
                    >
                      <CreditCard
                        className={`h-6 w-6 ${
                          payment.status === "paid"
                            ? "text-success"
                            : payment.status === "overdue"
                              ? "text-destructive"
                              : "text-primary"
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{payment.policyName}</h3>
                        {getStatusBadge(payment.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{payment.policyNumber}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <span className="font-medium">Amount: ₹{payment.amount.toLocaleString()}</span>
                        <span>Due: {payment.dueDate}</span>
                        {payment.paidDate && <span className="text-success">Paid: {payment.paidDate}</span>}
                        {payment.paymentMethod && (
                          <span className="text-muted-foreground">via {payment.paymentMethod}</span>
                        )}
                        {payment.transactionId && (
                          <span className="text-xs text-muted-foreground">TXN: {payment.transactionId}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {(payment.status === "upcoming" || payment.status === "overdue") && (
                    <Button variant={payment.status === "overdue" ? "destructive" : "default"}>Pay Now</Button>
                  )}
                  {payment.status === "paid" && (
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Receipt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}
