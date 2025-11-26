"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertCircle, Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { mockClaims } from "@/lib/api/mock-data/claims"
import Link from "next/link"

export default function AdminClaimsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredClaims = mockClaims.filter(
    (claim) =>
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "settled":
        return CheckCircle
      case "rejected":
        return XCircle
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "settled":
        return "bg-success/10 text-success"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-warning/10 text-warning"
    }
  }

  const getFraudScoreColor = (score?: number) => {
    if (!score) return ""
    if (score < 20) return "text-success"
    if (score < 50) return "text-warning"
    return "text-destructive"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Claims Review</h1>
          <p className="text-muted-foreground">Review and manage insurance claims with AI fraud detection</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockClaims.filter((c) => c.status === "pending" || c.status === "under-review").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClaims.filter((c) => c.status === "approved").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockClaims.filter((c) => c.fraudScore && c.fraudScore > 30).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredClaims.map((claim) => {
            const StatusIcon = getStatusIcon(claim.status)
            return (
              <Card key={claim.id} className="transition-all hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-1 gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <AlertCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{claim.claimNumber}</h3>
                          <Badge variant="outline" className={getStatusColor(claim.status)}>
                            <StatusIcon className="mr-1 h-3 w-3" />
                            {claim.status}
                          </Badge>
                          {claim.fraudScore !== undefined && (
                            <Badge
                              variant="outline"
                              className={`${claim.fraudScore > 30 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}
                            >
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Fraud Score: {claim.fraudScore}%
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{claim.policyNumber}</p>
                        <p className="text-sm">{claim.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span>Amount: ₹{claim.amount.toLocaleString()}</span>
                          <span>•</span>
                          <span>Filed: {claim.filedDate}</span>
                          <span>•</span>
                          <span>Documents: {claim.documents.length}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {(claim.status === "pending" || claim.status === "under-review") && (
                        <>
                          <Button size="sm" variant="outline" className="text-destructive bg-transparent">
                            Reject
                          </Button>
                          <Button size="sm" className="bg-success hover:bg-success/90">
                            Approve
                          </Button>
                        </>
                      )}
                      <Link href={`/admin/claims/${claim.id}`}>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
