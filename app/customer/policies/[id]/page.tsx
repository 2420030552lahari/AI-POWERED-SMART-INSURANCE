"use client"

import { useParams, useRouter } from "next/navigation"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import { mockPolicies } from "@/lib/api/mock-data/policies"
import { mockClaims } from "@/lib/api/mock-data/claims"
import { useAuthStore } from "@/lib/store/auth-store"
import { useToast } from "@/hooks/use-toast"
import {
  Download,
  RefreshCw,
  Shield,
  Calendar,
  IndianRupee,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function PolicyDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)
  const policyId = params.id as string

  const policy = mockPolicies.find((p) => p.id === policyId)
  const policyClaims = mockClaims.filter((c) => c.policyId === policyId)

  if (!policy) {
    return (
      <CustomerLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Policy Not Found</h2>
          <p className="text-muted-foreground">The policy you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.push("/customer/policies")}>
            Back to Policies
          </Button>
        </div>
      </CustomerLayout>
    )
  }

  const daysToExpiry = Math.ceil((new Date(policy.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isExpiringSoon = daysToExpiry > 0 && daysToExpiry <= 30

  const addOns = [
    { name: "Zero Depreciation", active: true, price: 1200 },
    { name: "Engine Protection", active: true, price: 800 },
    { name: "Roadside Assistance", active: false, price: 500 },
    { name: "NCB Protection", active: true, price: 600 },
    { name: "Return to Invoice", active: false, price: 1500 },
  ]

  const handleDownloadPDF = () => {
    // Generate and download policy PDF
    const pdfContent = `
SMART INSURANCE - POLICY DOCUMENT
${'='.repeat(50)}

Policy Number: ${policy.policyNumber}
Policy Name: ${policy.name}
Policyholder: ${user?.name || 'N/A'}
Email: ${user?.email || 'N/A'}
Phone: ${user?.phone || 'N/A'}

COVERAGE DETAILS
${'-'.repeat(50)}
Policy Type: ${policy.type.toUpperCase()}
Coverage Amount: ₹${policy.coverageAmount.toLocaleString()}
Annual Premium: ₹${policy.premium.toLocaleString()}
Status: ${policy.status.toUpperCase()}

VALIDITY PERIOD
${'-'.repeat(50)}
Start Date: ${new Date(policy.startDate).toLocaleDateString()}
End Date: ${new Date(policy.endDate).toLocaleDateString()}
Renewal Date: ${new Date(policy.renewalDate).toLocaleDateString()}

DESCRIPTION
${'-'.repeat(50)}
${policy.description}

${'='.repeat(50)}
This is a computer-generated document.
For queries, contact support@smartinsurance.com
    `

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `policy-${policy.policyNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Download Started",
      description: `Policy document ${policy.policyNumber} is being downloaded.`,
    })
  }

  const handleDownloadReceipt = () => {
    // Generate and download payment receipt
    const receiptContent = `
SMART INSURANCE - PAYMENT RECEIPT
${'='.repeat(50)}

Receipt for Policy: ${policy.policyNumber}
Policyholder: ${user?.name || 'N/A'}
Email: ${user?.email || 'N/A'}

PAYMENT DETAILS
${'-'.repeat(50)}
Amount Paid: ₹${policy.premium.toLocaleString()}
Payment Date: ${new Date(policy.startDate).toLocaleDateString()}
Payment Method: Online
Transaction ID: TXN${Date.now()}

${'='.repeat(50)}
Thank you for your payment!
    `

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${policy.policyNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "Download Started",
      description: "Payment receipt is being downloaded.",
    })
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Policy Header */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{policy.name}</h1>
                    <p className="text-muted-foreground">{policy.policyNumber}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <StatusBadge variant={policy.status === "active" ? "success" : "warning"} withDot>
                    {policy.status}
                  </StatusBadge>
                  <Badge variant="secondary">{policy.type}</Badge>
                  {isExpiringSoon && <StatusBadge variant="warning">Expiring in {daysToExpiry} days</StatusBadge>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleDownloadPDF} variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Policy
                </Button>
                <Link href={`/renew?policy=${policy.policyNumber}`}>
                  <Button className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Renew Now
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Policy Summary Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coverage Amount</p>
                  <p className="text-2xl font-bold">₹{(policy.coverageAmount / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-accent/10 p-2">
                  <IndianRupee className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Premium</p>
                  <p className="text-2xl font-bold">₹{policy.premium.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-success/10 p-2">
                  <Calendar className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valid Until</p>
                  <p className="text-xl font-bold">{new Date(policy.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-warning/10 p-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Claims Filed</p>
                  <p className="text-2xl font-bold">{policyClaims.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Policy Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coverage Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Coverage Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Policy Type</p>
                    <p className="font-semibold capitalize">{policy.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Policy Number</p>
                    <p className="font-semibold">{policy.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-semibold">{new Date(policy.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-semibold">{new Date(policy.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Renewal Date</p>
                    <p className="font-semibold">{new Date(policy.renewalDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sum Insured</p>
                    <p className="font-semibold">₹{policy.coverageAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{policy.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add-ons</CardTitle>
                  <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                    <Plus className="h-4 w-4" />
                    Add More
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {addOns.map((addon, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4"
                    >
                      <div className="flex items-center gap-3">
                        {addon.active ? (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-semibold">{addon.name}</p>
                          <p className="text-sm text-muted-foreground">{addon.active ? "Active" : "Not purchased"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{addon.price}</p>
                        {!addon.active && (
                          <Button size="sm" variant="link" className="h-auto p-0">
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Claim History */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Claim History</CardTitle>
                  <Link href="/customer/claims/new">
                    <Button size="sm" className="gap-2">
                      <Plus className="h-4 w-4" />
                      File New Claim
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {policyClaims.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                      <AlertCircle className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No claims filed for this policy</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {policyClaims.map((claim) => (
                      <div
                        key={claim.id}
                        className="flex items-start justify-between rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{claim.claimNumber}</h3>
                            <StatusBadge
                              variant={
                                claim.status === "approved"
                                  ? "success"
                                  : claim.status === "rejected"
                                    ? "destructive"
                                    : "warning"
                              }
                              withDot
                            >
                              {claim.status}
                            </StatusBadge>
                          </div>
                          <p className="text-sm text-muted-foreground">{claim.description}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <span className="font-medium">₹{claim.amount.toLocaleString()}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{claim.filedDate}</span>
                          </div>
                        </div>
                        <Link href={`/customer/claims/${claim.id}`}>
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Policyholder Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Policyholder Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-semibold">{user?.name || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{user?.phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{user?.email || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-semibold">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Receipts */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Payment Receipts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                >
                  <FileText className="h-4 w-4" />
                  Premium Receipt - 2024
                </Button>
                <Button
                  onClick={handleDownloadReceipt}
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                >
                  <FileText className="h-4 w-4" />
                  Add-on Receipt - 2024
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/renew?policy=${policy.policyNumber}`}>
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                    Renew Policy
                  </Button>
                </Link>
                <Link href="/customer/service-requests">
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Request Changes
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-transparent"
                  onClick={handleDownloadPDF}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
