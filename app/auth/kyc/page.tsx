"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/ui/stepper"
import { FileUploader } from "@/components/ui/file-uploader"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockDelay } from "@/lib/api/mock-api"

export default function KYCPage() {
  const t = useTranslation()
  const router = useRouter()
  const { toast } = useToast()
  const updateUser = useAuthStore((state) => state.updateUser)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null)
  const [panFile, setPanFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const steps = [
    { label: t.kyc.basicInfo },
    { label: t.kyc.address },
    { label: t.kyc.documents },
    { label: t.kyc.review },
  ]

  const handleNext = async () => {
    if (currentStep === 3 && aadhaarFile) {
      // Simulate OCR processing
      setIsProcessing(true)
      await mockDelay(2000)
      setIsProcessing(false)
      toast({
        title: t.kyc.eKYCSuccess,
        description: "Your documents have been verified",
      })
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await mockDelay(1500)
    updateUser({ kycStatus: "completed" })
    toast({
      title: t.common.success,
      description: "KYC completed successfully",
    })
    router.push("/customer/dashboard")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t.kyc.title}</CardTitle>
              <CardDescription>Complete your verification to start using services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <Stepper steps={steps} currentStep={currentStep} />

              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.kyc.fullName}</Label>
                      <Input id="fullName" placeholder="As per Aadhaar" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">{t.kyc.dateOfBirth}</Label>
                      <Input id="dob" type="date" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t.kyc.gender}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pan">{t.kyc.panNumber}</Label>
                      <Input id="pan" placeholder="ABCDE1234F" maxLength={10} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">{t.kyc.aadhaarNumber}</Label>
                      <Input id="aadhaar" placeholder="1234 5678 9012" maxLength={12} required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">{t.kyc.addressLine1}</Label>
                    <Input id="address1" placeholder="House/Flat No., Building Name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2">{t.kyc.addressLine2}</Label>
                    <Input id="address2" placeholder="Street, Area, Landmark" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t.kyc.city}</Label>
                      <Input id="city" placeholder="Mumbai" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">{t.kyc.state}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MH">Maharashtra</SelectItem>
                          <SelectItem value="DL">Delhi</SelectItem>
                          <SelectItem value="KA">Karnataka</SelectItem>
                          <SelectItem value="TN">Tamil Nadu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">{t.kyc.pincode}</Label>
                      <Input id="pincode" placeholder="400001" maxLength={6} required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {isProcessing && (
                    <div className="flex items-center justify-center gap-3 rounded-xl border-2 border-primary bg-primary/5 p-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <div>
                        <p className="font-medium text-primary">Processing e-KYC...</p>
                        <p className="text-sm text-muted-foreground">Extracting information from documents</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>{t.kyc.uploadAadhaar}</Label>
                    <FileUploader
                      accept="image/*,.pdf"
                      onFileSelect={setAadhaarFile}
                      onFileRemove={() => setAadhaarFile(null)}
                      label={t.kyc.uploadAadhaar}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.kyc.uploadPAN}</Label>
                    <FileUploader
                      accept="image/*,.pdf"
                      onFileSelect={setPanFile}
                      onFileRemove={() => setPanFile(null)}
                      label={t.kyc.uploadPAN}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.kyc.uploadPhoto}</Label>
                    <FileUploader
                      accept="image/*"
                      onFileSelect={setPhotoFile}
                      onFileRemove={() => setPhotoFile(null)}
                      label={t.kyc.uploadPhoto}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="rounded-xl border-2 border-success bg-success/5 p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-success" />
                      <div>
                        <h3 className="font-semibold text-success">Documents Verified</h3>
                        <p className="text-sm text-muted-foreground">
                          Your information has been successfully verified through e-KYC
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl border bg-card p-6">
                    <h3 className="font-semibold">Review Your Information</h3>
                    <div className="grid gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Full Name</span>
                        <span className="font-medium">Rahul Sharma</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">PAN Number</span>
                        <span className="font-medium">ABCDE1234F</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Aadhaar Number</span>
                        <span className="font-medium">**** **** 9012</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address</span>
                        <span className="font-medium text-right">Mumbai, Maharashtra</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-xl border bg-muted/50 p-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox id="consent" required />
                      <label htmlFor="consent" className="text-sm leading-relaxed">
                        {t.kyc.consentMessage}
                      </label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm leading-relaxed">
                        {t.kyc.agreeToTerms}
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>
                    {t.common.back}
                  </Button>
                )}
                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext} className="flex-1" disabled={isProcessing}>
                    {isProcessing ? t.common.loading : t.common.next}
                  </Button>
                ) : (
                  <Button type="button" onClick={handleSubmit} className="flex-1" disabled={isLoading}>
                    {isLoading ? t.common.loading : t.common.submit}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
