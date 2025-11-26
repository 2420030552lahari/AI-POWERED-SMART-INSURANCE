"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, Upload, FileText, User, CreditCard, Home } from "lucide-react"

export default function KYCPage() {
  const [kycStatus] = useState<"verified" | "pending" | "rejected">("pending")

  const kycDocuments = [
    {
      type: "identity",
      name: "Aadhaar Card",
      status: "verified" as const,
      uploadedOn: "15 Jan 2024",
      icon: User,
    },
    {
      type: "address",
      name: "Utility Bill",
      status: "pending" as const,
      uploadedOn: "20 Jan 2024",
      icon: Home,
    },
    {
      type: "financial",
      name: "PAN Card",
      status: "verified" as const,
      uploadedOn: "15 Jan 2024",
      icon: CreditCard,
    },
  ]

  const getStatusBadge = (status: "verified" | "pending" | "rejected") => {
    const config = {
      verified: { variant: "default" as const, text: "Verified", icon: CheckCircle2, color: "text-success" },
      pending: { variant: "secondary" as const, text: "Pending Review", icon: Clock, color: "text-warning" },
      rejected: { variant: "destructive" as const, text: "Rejected", icon: AlertCircle, color: "text-destructive" },
    }
    const { variant, text, icon: Icon, color } = config[status]
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`h-3 w-3 ${color}`} />
        {text}
      </Badge>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">KYC Verification</h1>
          <p className="text-muted-foreground">Manage your KYC documents and verification status</p>
        </div>

        <Card className={`shadow-card ${kycStatus === "pending" ? "border-warning" : ""}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>KYC Status</CardTitle>
              {getStatusBadge(kycStatus)}
            </div>
          </CardHeader>
          <CardContent>
            {kycStatus === "pending" && (
              <div className="rounded-xl bg-warning/10 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-warning" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">Verification in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Your KYC documents are being reviewed. This typically takes 2-3 business days. We'll notify you
                      once the verification is complete.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {kycStatus === "verified" && (
              <div className="rounded-xl bg-success/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                  <div className="space-y-1">
                    <h3 className="font-semibold">KYC Verified</h3>
                    <p className="text-sm text-muted-foreground">
                      Your KYC verification is complete. You can now access all features of your account.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          {kycDocuments.map((doc, index) => {
            const Icon = doc.icon
            return (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          doc.status === "verified"
                            ? "bg-success/10"
                            : doc.status === "pending"
                              ? "bg-warning/10"
                              : "bg-destructive/10"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            doc.status === "verified"
                              ? "text-success"
                              : doc.status === "pending"
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadedOn}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(doc.status)}
                      <Button size="sm" variant="ghost" className="gap-2">
                        <FileText className="h-4 w-4" />
                        View
                      </Button>
                    </div>
                    {doc.status === "pending" && (
                      <Button size="sm" variant="outline" className="w-full gap-2 bg-transparent">
                        <Upload className="h-4 w-4" />
                        Re-upload
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>KYC History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "20 Jan 2024", action: "Utility Bill uploaded for verification", status: "pending" },
                { date: "15 Jan 2024", action: "PAN Card verified successfully", status: "verified" },
                { date: "15 Jan 2024", action: "Aadhaar Card verified successfully", status: "verified" },
                { date: "10 Jan 2024", action: "KYC process initiated", status: "verified" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-xl border bg-gradient-to-br from-muted/50 to-muted/30 p-4"
                >
                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      item.status === "verified" ? "bg-success" : "bg-warning"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
