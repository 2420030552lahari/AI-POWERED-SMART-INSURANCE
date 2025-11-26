"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, CheckCircle } from "lucide-react"
import { downloadInvoice, type InvoiceData } from "@/lib/utils/invoice-generator"

export default function InvoiceDemoPage() {
    const handleDownloadSample = () => {
        const sampleInvoice: InvoiceData = {
            policyNumber: "POL/2024/MI/123456",
            policyType: "Motor Insurance",
            customerName: "Rajesh Kumar",
            customerEmail: "rajesh.kumar@example.com",
            customerPhone: "+91 98765 43210",
            customerAddress: "Flat 301, Sunshine Apartments, MG Road, Mumbai, Maharashtra 400001",
            planName: "Comprehensive",
            premium: 12500,
            gst: 18,
            discount: 500,
            issueDate: new Date().toISOString(),
            validFrom: new Date().toISOString(),
            validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            idv: "₹10 Lakh",
            addons: ["Zero Depreciation", "Engine Protection", "NCB Protection", "Roadside Assistance"]
        }

        downloadInvoice(sampleInvoice)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">PDF Invoice Generator</h1>
                    <p className="text-muted-foreground text-lg">
                        Professional insurance policy invoices with complete billing details
                    </p>
                </div>

                <Card className="border-2 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <FileText className="h-6 w-6 text-primary" />
                            Invoice Features
                        </CardTitle>
                        <CardDescription>
                            Download a professionally formatted PDF invoice with all policy details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg mb-3">Invoice Includes:</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Company details with IRDAI & GST numbers</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Customer billing information</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Policy number and coverage details</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Premium breakdown with GST (18%)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Discount calculations (if applicable)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg mb-3">Additional Details:</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">IDV (Insured Declared Value)</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Add-ons and coverage period</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Payment status badge</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Professional formatting & branding</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                        <span className="text-sm">Print-ready PDF format</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                            <h4 className="font-semibold text-blue-900 mb-2">Sample Invoice Details</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-blue-700">Policy Number:</span>
                                    <p className="font-medium text-blue-900">POL/2024/MI/123456</p>
                                </div>
                                <div>
                                    <span className="text-blue-700">Plan:</span>
                                    <p className="font-medium text-blue-900">Comprehensive</p>
                                </div>
                                <div>
                                    <span className="text-blue-700">Premium:</span>
                                    <p className="font-medium text-blue-900">₹12,500</p>
                                </div>
                                <div>
                                    <span className="text-blue-700">Total (with GST):</span>
                                    <p className="font-medium text-blue-900">₹14,160</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                size="lg"
                                className="flex-1 gap-2 text-lg h-14"
                                onClick={handleDownloadSample}
                            >
                                <Download className="h-5 w-5" />
                                Download Sample Invoice PDF
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="flex-1 gap-2 text-lg h-14"
                                onClick={() => window.location.href = '/buy'}
                            >
                                <FileText className="h-5 w-5" />
                                Go to Policy Purchase
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground mt-6">
                            Click the button above to download a sample PDF invoice or go to the policy purchase page to complete a full transaction
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
