"use client"

import { Suspense } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComparePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CompareContent />
        </Suspense>
    )
}

function CompareContent() {
    // Mock comparison data
    const comparisonData = [
        {
            id: "prod_001",
            title: "Comprehensive Car Insurance",
            category: "Motor",
            premium: 3499,
            coverage: "₹10 Lakh",
            addons: "Full",
            claimRatio: "95%",
            features: {
                "Zero Depreciation": true,
                "Roadside Assistance": true,
                "Engine Protection": true,
                "NCB Protection": true,
                "Consumables Cover": true,
                "Key Replacement": false,
            },
        },
        {
            id: "prod_002",
            title: "Family Health Shield",
            category: "Health",
            premium: 12999,
            coverage: "₹5 Lakh",
            addons: "Available",
            claimRatio: "97%",
            features: {
                "Zero Depreciation": false,
                "Roadside Assistance": false,
                "Engine Protection": false,
                "NCB Protection": false,
                "Consumables Cover": false,
                "Key Replacement": false,
            },
        },
        {
            id: "prod_003",
            title: "Two Wheeler Protection",
            category: "Motor",
            premium: 1299,
            coverage: "₹2 Lakh",
            addons: "Limited",
            claimRatio: "93%",
            features: {
                "Zero Depreciation": true,
                "Roadside Assistance": true,
                "Engine Protection": false,
                "NCB Protection": true,
                "Consumables Cover": false,
                "Key Replacement": false,
            },
        },
    ]

    const features = [
        "Premium (per year)",
        "Coverage Amount",
        "Add-ons",
        "Claim Settlement Ratio",
        ...Object.keys(comparisonData[0].features),
    ]

    return (
        <CustomerLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/products">
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">Compare Insurance Plans</h1>
                        <p className="text-muted-foreground">Side-by-side comparison of selected products</p>
                    </div>
                </div>

                {/* Comparison Table */}
                <Card className="shadow-lg rounded-3xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b bg-muted/50">
                                        <th className="p-6 text-left font-bold sticky left-0 bg-muted/50 z-10">Feature</th>
                                        {comparisonData.map((product) => (
                                            <th key={product.id} className="p-6 min-w-[280px]">
                                                <div className="space-y-3">
                                                    <h3 className="font-bold text-lg">{product.title}</h3>
                                                    <Badge variant="secondary">{product.category}</Badge>
                                                    <div className="flex gap-2 justify-center">
                                                        <Link href={`/buy?product=${product.id}`}>
                                                            <Button size="sm" className="rounded-xl">
                                                                Get Quote
                                                            </Button>
                                                        </Link>
                                                        <Button size="sm" variant="outline" className="rounded-xl">
                                                            Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Premium */}
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-6 font-semibold sticky left-0 bg-white">Premium (per year)</td>
                                        {comparisonData.map((product) => (
                                            <td key={product.id} className="p-6 text-center">
                                                <span className="text-2xl font-bold text-primary">₹{product.premium.toLocaleString()}</span>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Coverage */}
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-6 font-semibold sticky left-0 bg-white">Coverage Amount</td>
                                        {comparisonData.map((product) => (
                                            <td key={product.id} className="p-6 text-center">
                                                <span className="text-xl font-semibold">{product.coverage}</span>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Add-ons */}
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-6 font-semibold sticky left-0 bg-white">Add-ons</td>
                                        {comparisonData.map((product) => (
                                            <td key={product.id} className="p-6 text-center">
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        product.addons === "Full"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : product.addons === "Available"
                                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                                    }
                                                >
                                                    {product.addons}
                                                </Badge>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Claim Ratio */}
                                    <tr className="border-b hover:bg-muted/30">
                                        <td className="p-6 font-semibold sticky left-0 bg-white">Claim Settlement Ratio</td>
                                        {comparisonData.map((product) => (
                                            <td key={product.id} className="p-6 text-center">
                                                <span className="text-lg font-semibold text-green-600">{product.claimRatio}</span>
                                            </td>
                                        ))}
                                    </tr>

                                    {/* Features */}
                                    {Object.keys(comparisonData[0].features).map((feature) => (
                                        <tr key={feature} className="border-b hover:bg-muted/30">
                                            <td className="p-6 font-semibold sticky left-0 bg-white">{feature}</td>
                                            {comparisonData.map((product) => (
                                                <td key={product.id} className="p-6 text-center">
                                                    {product.features[feature as keyof typeof product.features] ? (
                                                        <div className="flex justify-center">
                                                            <div className="rounded-full bg-green-100 p-2">
                                                                <Check className="h-5 w-5 text-green-600" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-center">
                                                            <div className="rounded-full bg-red-100 p-2">
                                                                <X className="h-5 w-5 text-red-600" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <Link href="/products">
                        <Button variant="outline" className="rounded-xl">
                            Back to Products
                        </Button>
                    </Link>
                    <Button className="rounded-xl">Save Comparison</Button>
                </div>
            </div>
        </CustomerLayout>
    )
}
