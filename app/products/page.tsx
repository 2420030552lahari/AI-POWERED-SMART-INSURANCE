"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Search,
    Car,
    Heart,
    Plane,
    Home,
    Shield,
    Briefcase,
    PawPrint,
    ChevronRight,
    Star,
    TrendingUp,
    Sparkles,
    Check,
    X,
} from "lucide-react"
import Link from "next/link"

type Product = {
    id: string
    title: string
    category: "motor" | "health" | "travel" | "home" | "cyber" | "sme" | "pet"
    subcategory: string
    premium: number
    coverage: string
    highlights: string[]
    badges: ("recommended" | "bestseller" | "trending")[]
    claimRatio: number
    addons: "available" | "limited" | "full"
}

const mockProducts: Product[] = [
    {
        id: "prod_001",
        title: "Comprehensive Car Insurance",
        category: "motor",
        subcategory: "Car Insurance",
        premium: 3499,
        coverage: "₹10 Lakh",
        highlights: ["Zero Depreciation", "24/7 Roadside Assistance", "Cashless Garage Network"],
        badges: ["recommended", "bestseller"],
        claimRatio: 95,
        addons: "full",
    },
    {
        id: "prod_002",
        title: "Family Health Shield",
        category: "health",
        subcategory: "Family Floater",
        premium: 12999,
        coverage: "₹5 Lakh",
        highlights: ["Covers 4 Members", "Pre & Post Hospitalization", "No Room Rent Limit"],
        badges: ["recommended", "trending"],
        claimRatio: 97,
        addons: "available",
    },
    {
        id: "prod_003",
        title: "Two Wheeler Protection",
        category: "motor",
        subcategory: "Bike Insurance",
        premium: 1299,
        coverage: "₹2 Lakh",
        highlights: ["Own Damage Cover", "Third Party Cover", "Personal Accident Cover"],
        badges: ["bestseller"],
        claimRatio: 93,
        addons: "limited",
    },
    {
        id: "prod_004",
        title: "International Travel Guard",
        category: "travel",
        subcategory: "International Travel",
        premium: 899,
        coverage: "$50,000",
        highlights: ["Medical Emergency", "Trip Cancellation", "Baggage Loss"],
        badges: ["trending"],
        claimRatio: 91,
        addons: "available",
    },
    {
        id: "prod_005",
        title: "Senior Citizen Health Plus",
        category: "health",
        subcategory: "Senior Citizen Health",
        premium: 18999,
        coverage: "₹10 Lakh",
        highlights: ["Age: 60-80 Years", "Pre-existing Diseases", "Daily Cash Allowance"],
        badges: ["recommended"],
        claimRatio: 96,
        addons: "full",
    },
    {
        id: "prod_006",
        title: "Home Shield Complete",
        category: "home",
        subcategory: "Home Insurance",
        premium: 4999,
        coverage: "₹30 Lakh",
        highlights: ["Structure & Contents", "Natural Calamities", "Theft Protection"],
        badges: ["bestseller"],
        claimRatio: 94,
        addons: "available",
    },
    {
        id: "prod_007",
        title: "Cyber Security Pro",
        category: "cyber",
        subcategory: "Cyber Insurance",
        premium: 2499,
        coverage: "₹5 Lakh",
        highlights: ["Data Breach Cover", "Cyber Fraud Protection", "Legal Support"],
        badges: ["trending"],
        claimRatio: 89,
        addons: "limited",
    },
    {
        id: "prod_008",
        title: "Pet Care Plus",
        category: "pet",
        subcategory: "Pet Insurance",
        premium: 999,
        coverage: "₹1 Lakh",
        highlights: ["Veterinary Bills", "Surgery Cover", "Third Party Liability"],
        badges: ["trending"],
        claimRatio: 92,
        addons: "available",
    },
]

const categories = [
    {
        name: "MOTOR",
        icon: Car,
        color: "bg-blue-100 text-blue-600",
        items: ["Car Insurance", "Bike Insurance", "Commercial Vehicle"],
    },
    {
        name: "HEALTH",
        icon: Heart,
        color: "bg-red-100 text-red-600",
        items: ["Family Floater", "Senior Citizen Health", "Individual Health"],
    },
    {
        name: "TRAVEL",
        icon: Plane,
        color: "bg-purple-100 text-purple-600",
        items: ["Domestic Travel", "International Travel"],
    },
    {
        name: "OTHER",
        icon: Shield,
        color: "bg-green-100 text-green-600",
        items: ["Cyber Insurance", "Fire Insurance", "Home Insurance", "Pet Insurance", "SME Insurance"],
    },
]

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedFilter, setSelectedFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("recommended")
    const [compareList, setCompareList] = useState<string[]>([])

    const filteredProducts = mockProducts.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "recommended" && product.badges.includes("recommended")) ||
            (selectedFilter === "low-premium" && product.premium < 5000) ||
            (selectedFilter === "high-coverage" && parseInt(product.coverage.replace(/[^0-9]/g, "")) >= 500000)
        return matchesSearch && matchesCategory && matchesFilter
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "premium-low") return a.premium - b.premium
        if (sortBy === "premium-high") return b.premium - a.premium
        if (sortBy === "coverage-high") {
            const aCov = parseInt(a.coverage.replace(/[^0-9]/g, ""))
            const bCov = parseInt(b.coverage.replace(/[^0-9]/g, ""))
            return bCov - aCov
        }
        return 0
    })

    const recommendedProducts = mockProducts.filter((p) => p.badges.includes("recommended")).slice(0, 6)

    const toggleCompare = (productId: string) => {
        if (compareList.includes(productId)) {
            setCompareList(compareList.filter((id) => id !== productId))
        } else if (compareList.length < 3) {
            setCompareList([...compareList, productId])
        }
    }

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "motor":
                return Car
            case "health":
                return Heart
            case "travel":
                return Plane
            case "home":
                return Home
            case "cyber":
                return Shield
            case "sme":
                return Briefcase
            case "pet":
                return PawPrint
            default:
                return Shield
        }
    }

    const getBadgeColor = (badge: string) => {
        switch (badge) {
            case "recommended":
                return "bg-blue-100 text-blue-700 border-blue-200"
            case "bestseller":
                return "bg-amber-100 text-amber-700 border-amber-200"
            case "trending":
                return "bg-green-100 text-green-700 border-green-200"
            default:
                return ""
        }
    }

    const getBadgeIcon = (badge: string) => {
        switch (badge) {
            case "recommended":
                return Sparkles
            case "bestseller":
                return Star
            case "trending":
                return TrendingUp
            default:
                return Star
        }
    }

    return (
        <CustomerLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Explore Insurance Products</h1>
                    <p className="text-muted-foreground">Find the perfect insurance coverage for your needs</p>
                </div>

                {/* Search + Filters */}
                <Card className="shadow-lg rounded-3xl">
                    <CardContent className="p-6 space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search for car, bike, health insurance..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-12 rounded-xl text-base"
                            />
                        </div>

                        {/* Filters Row */}
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="motor">Motor</SelectItem>
                                    <SelectItem value="health">Health</SelectItem>
                                    <SelectItem value="travel">Travel</SelectItem>
                                    <SelectItem value="home">Home</SelectItem>
                                    <SelectItem value="cyber">Cyber</SelectItem>
                                    <SelectItem value="sme">SME</SelectItem>
                                    <SelectItem value="pet">Pet</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Filter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Products</SelectItem>
                                    <SelectItem value="recommended">Recommended</SelectItem>
                                    <SelectItem value="low-premium">Low Premium</SelectItem>
                                    <SelectItem value="high-coverage">High Coverage</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recommended">Recommended</SelectItem>
                                    <SelectItem value="premium-low">Premium: Low → High</SelectItem>
                                    <SelectItem value="premium-high">Premium: High → Low</SelectItem>
                                    <SelectItem value="coverage-high">Coverage: High → Low</SelectItem>
                                    <SelectItem value="bestseller">Best Sellers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Categories Grid */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <Card
                                    key={category.name}
                                    className="shadow-lg rounded-3xl hover:shadow-xl transition-all cursor-pointer"
                                    onClick={() => setSelectedCategory(category.name.toLowerCase())}
                                >
                                    <CardContent className="p-6">
                                        <div className={`rounded-full p-3 w-fit mb-3 ${category.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-bold mb-2">{category.name}</h3>
                                        <ul className="space-y-1">
                                            {category.items.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground flex items-center gap-1">
                                                    <ChevronRight className="h-3 w-3" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Recommended For You */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold">Recommended For You</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recommendedProducts.map((product) => {
                            const Icon = getCategoryIcon(product.category)
                            return (
                                <Card key={product.id} className="shadow-lg rounded-3xl hover:shadow-xl transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`rounded-full p-2 ${getCategoryIcon === Car ? "bg-blue-100" : "bg-red-100"}`}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                Recommended
                                            </Badge>
                                        </div>
                                        <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{product.subcategory}</p>
                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-2xl font-bold text-primary">₹{product.premium.toLocaleString()}</span>
                                            <span className="text-sm text-muted-foreground">/year</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button className="flex-1 rounded-xl" size="sm">
                                                Get Quote
                                            </Button>
                                            <Button variant="outline" className="flex-1 rounded-xl" size="sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* All Products Grid */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        All Products ({sortedProducts.length})
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedProducts.map((product) => {
                            const Icon = getCategoryIcon(product.category)
                            const isComparing = compareList.includes(product.id)
                            return (
                                <Card
                                    key={product.id}
                                    className={`shadow-lg rounded-3xl hover:shadow-xl transition-all ${isComparing ? "ring-2 ring-primary" : ""
                                        }`}
                                >
                                    <CardContent className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="rounded-full p-2 bg-gradient-to-br from-primary/10 to-primary/5">
                                                <Icon className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={isComparing}
                                                    onCheckedChange={() => toggleCompare(product.id)}
                                                    disabled={!isComparing && compareList.length >= 3}
                                                />
                                            </div>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {product.badges.map((badge) => {
                                                const BadgeIcon = getBadgeIcon(badge)
                                                return (
                                                    <Badge key={badge} className={getBadgeColor(badge)}>
                                                        <BadgeIcon className="h-3 w-3 mr-1" />
                                                        {badge.charAt(0).toUpperCase() + badge.slice(1)}
                                                    </Badge>
                                                )
                                            })}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{product.subcategory}</p>

                                        {/* Pricing */}
                                        <div className="mb-4">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-sm text-muted-foreground">Starting from</span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-primary">₹{product.premium.toLocaleString()}</span>
                                                <span className="text-sm text-muted-foreground">/year</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">Coverage: {product.coverage}</p>
                                        </div>

                                        {/* Highlights */}
                                        <div className="space-y-2 mb-4">
                                            {product.highlights.map((highlight, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <Link href={`/products/${product.category}`} className="flex-1">
                                                <Button variant="outline" className="w-full rounded-xl" size="sm">
                                                    View Details
                                                </Button>
                                            </Link>
                                            <Link href={`/buy?product=${product.id}`} className="flex-1">
                                                <Button className="w-full rounded-xl" size="sm">
                                                    Get Quote
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {sortedProducts.length === 0 && (
                        <Card className="shadow-lg rounded-3xl">
                            <CardContent className="p-12 text-center">
                                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Compare Bar Drawer */}
                {compareList.length > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
                        <div className="container mx-auto px-4 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h3 className="font-bold">Compare Products ({compareList.length}/3)</h3>
                                    <div className="flex gap-2">
                                        {compareList.map((id) => {
                                            const product = mockProducts.find((p) => p.id === id)
                                            return (
                                                <Badge key={id} variant="secondary" className="gap-2">
                                                    {product?.title}
                                                    <button onClick={() => toggleCompare(id)} className="hover:text-destructive">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setCompareList([])} className="rounded-xl">
                                        Clear All
                                    </Button>
                                    <Button
                                        disabled={compareList.length < 2}
                                        className="rounded-xl"
                                        onClick={() => {
                                            // Navigate to comparison page
                                            window.location.href = `/products/compare?ids=${compareList.join(",")}`
                                        }}
                                    >
                                        Compare Plans ({compareList.length})
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
