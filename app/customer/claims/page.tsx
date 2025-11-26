"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AlertCircle, Search, Plus, Clock, CheckCircle, XCircle, FileText } from "lucide-react"
import Link from "next/link"
import { mockClaims, type ClaimStatus } from "@/lib/api/mock-data/claims"

export default function ClaimsPage() {
  const t = useTranslation()
  const user = useAuthStore((state) => state.user)
  const [searchQuery, setSearchQuery] = useState("")

  const userClaims = mockClaims.filter((c) => c.userId === user?.id)

  const filteredClaims = userClaims.filter(
    (claim) =>
      claim.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: ClaimStatus) => {
    switch (status) {
      case "approved":
      case "settled":
        return CheckCircle
      case "rejected":
        return XCircle
      case "pending":
      case "under-review":
        return Clock
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: ClaimStatus) => {
    switch (status) {
      case "approved":
      case "settled":
        return "bg-success/10 text-success"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      case "under-review":
        return "bg-info/10 text-info"
      default:
        return "bg-warning/10 text-warning"
    }
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t.claims.myClaims}</h1>
            <p className="text-muted-foreground">Track and manage your insurance claims</p>
          </div>
          <Link href="/customer/claims/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t.claims.fileNewClaim}
            </Button>
          </Link>
        </div>

        {/* Search */}
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

        {/* Claims List */}
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
                          {claim.fraudScore !== undefined && claim.fraudScore > 30 && (
                            <Badge variant="outline" className="bg-warning/10 text-warning">
                              Review Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{claim.policyNumber}</p>
                        <p className="text-sm">{claim.description}</p>
                        <div className="flex flex-wrap gap-4 pt-1 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-medium">₹{claim.amount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Filed: </span>
                            <span className="font-medium">{claim.filedDate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Documents: </span>
                            <span className="font-medium">{claim.documents.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href={`/customer/claims/${claim.id}`}>
                      <Button size="sm" variant="outline">
                        {t.common.viewDetails}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {filteredClaims.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-semibold">No claims found</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {searchQuery ? "Try adjusting your search" : "You haven't filed any claims yet"}
                </p>
                <Link href="/customer/claims/new">
                  <Button>{t.claims.fileNewClaim}</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </CustomerLayout>
  )
}
