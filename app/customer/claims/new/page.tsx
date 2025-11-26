"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/ui/file-uploader"
import { Sparkles, Loader2, CheckCircle } from "lucide-react"
import { mockPolicies } from "@/lib/api/mock-data/policies"
import { useToast } from "@/hooks/use-toast"
import { mockDelay } from "@/lib/api/mock-api"

export default function NewClaimPage() {
  const t = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrExtracted, setOcrExtracted] = useState(false)
  const [documents, setDocuments] = useState<File[]>([])

  const userPolicies = mockPolicies.filter((p) => p.userId === user?.id && p.status === "active")

  const handleFileSelect = async (file: File) => {
    setDocuments([...documents, file])

    // Simulate OCR processing
    setIsProcessing(true)
    await mockDelay(2000)
    setIsProcessing(false)
    setOcrExtracted(true)

    toast({
      title: "Document Processed",
      description: "Information extracted successfully using AI",
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await mockDelay(1500)

    toast({
      title: t.common.success,
      description: "Claim filed successfully",
    })

    router.push("/customer/claims")
    setIsLoading(false)
  }

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{t.claims.fileNewClaim}</h1>
          <p className="text-muted-foreground">Submit your insurance claim with AI-assisted processing</p>
        </div>

        {/* AI Processing Banner */}
        {isProcessing && (
          <Card className="border-2 border-primary bg-primary/5">
            <CardContent className="flex items-center gap-3 p-6">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <div>
                <p className="font-medium text-primary">AI Processing Document...</p>
                <p className="text-sm text-muted-foreground">Extracting information using OCR technology</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Banner */}
        {ocrExtracted && (
          <Card className="border-2 border-success bg-success/5">
            <CardContent className="flex items-center gap-3 p-6">
              <CheckCircle className="h-6 w-6 text-success" />
              <div>
                <p className="font-medium text-success">Information Extracted</p>
                <p className="text-sm text-muted-foreground">Review and confirm the auto-filled details below</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Claim Form */}
        <Card>
          <CardHeader>
            <CardTitle>Claim Details</CardTitle>
            <CardDescription>Provide information about your claim</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="policy">Select Policy</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a policy" />
                  </SelectTrigger>
                  <SelectContent>
                    {userPolicies.map((policy) => (
                      <SelectItem key={policy.id} value={policy.id}>
                        {policy.name} - {policy.policyNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="claimType">Claim Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health">Health / Medical</SelectItem>
                    <SelectItem value="vehicle">Vehicle Damage</SelectItem>
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="home">Home / Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Claim Amount (₹)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="50000"
                  required
                  defaultValue={ocrExtracted ? "45000" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date</Label>
                <Input id="incidentDate" name="incidentDate" type="date" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the incident and claim details..."
                  rows={4}
                  required
                  defaultValue={
                    ocrExtracted
                      ? "Hospitalization for appendicitis surgery including pre and post-operative care."
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>{t.claims.uploadDocuments}</Label>
                <FileUploader
                  accept="image/*,.pdf"
                  onFileSelect={handleFileSelect}
                  label="Upload medical bills, receipts, or supporting documents"
                />
                {documents.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">{documents.length} document(s) uploaded</p>
                  </div>
                )}
              </div>

              <div className="rounded-xl border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">AI-Assisted Claims Processing</p>
                    <p className="text-muted-foreground">
                      Our AI will analyze your documents, extract relevant information, and estimate processing time
                      based on fraud risk assessment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                  {t.common.cancel}
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading || isProcessing}>
                  {isLoading ? t.common.loading : t.common.submit}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
