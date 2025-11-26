"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Phone, Filter, Navigation, Building2, Car } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock data for network providers
const HOSPITALS = [
    {
        id: 1,
        name: "Apollo Hospitals",
        address: "Jubilee Hills, Hyderabad, Telangana 500033",
        phone: "+91 40 2360 7777",
        rating: 4.8,
        distance: "2.5 km",
        cashless: true,
        type: "hospital"
    },
    {
        id: 2,
        name: "Yashoda Hospitals",
        address: "Somajiguda, Hyderabad, Telangana 500082",
        phone: "+91 40 4567 4567",
        rating: 4.7,
        distance: "4.1 km",
        cashless: true,
        type: "hospital"
    },
    {
        id: 3,
        name: "Care Hospitals",
        address: "Banjara Hills, Hyderabad, Telangana 500034",
        phone: "+91 40 3041 8888",
        rating: 4.5,
        distance: "3.8 km",
        cashless: true,
        type: "hospital"
    },
    {
        id: 4,
        name: "KIMS Hospitals",
        address: "Secunderabad, Hyderabad, Telangana 500003",
        phone: "+91 40 4488 5000",
        rating: 4.6,
        distance: "6.2 km",
        cashless: true,
        type: "hospital"
    },
    {
        id: 5,
        name: "Sunshine Hospitals",
        address: "Paradise Circle, Secunderabad, Telangana 500003",
        phone: "+91 40 4455 0000",
        rating: 4.4,
        distance: "5.5 km",
        cashless: false,
        type: "hospital"
    }
]

const GARAGES = [
    {
        id: 1,
        name: "Maruti Suzuki Service Center",
        address: "Madhapur, Hyderabad, Telangana 500081",
        phone: "+91 98765 43210",
        rating: 4.5,
        distance: "1.2 km",
        cashless: true,
        type: "garage"
    },
    {
        id: 2,
        name: "Hyundai Authorized Service",
        address: "Gachibowli, Hyderabad, Telangana 500032",
        phone: "+91 98765 12345",
        rating: 4.6,
        distance: "3.5 km",
        cashless: true,
        type: "garage"
    },
    {
        id: 3,
        name: "Honda Service Center",
        address: "Kukatpally, Hyderabad, Telangana 500072",
        phone: "+91 98765 67890",
        rating: 4.3,
        distance: "5.0 km",
        cashless: true,
        type: "garage"
    },
    {
        id: 4,
        name: "Toyota Service Plaza",
        address: "Kondapur, Hyderabad, Telangana 500084",
        phone: "+91 98765 09876",
        rating: 4.7,
        distance: "2.8 km",
        cashless: true,
        type: "garage"
    },
    {
        id: 5,
        name: "Tata Motors Service",
        address: "Hitech City, Hyderabad, Telangana 500081",
        phone: "+91 98765 54321",
        rating: 4.2,
        distance: "1.8 km",
        cashless: false,
        type: "garage"
    }
]

export default function NetworkPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCity, setSelectedCity] = useState("hyderabad")
    const [activeTab, setActiveTab] = useState("hospitals")

    const filteredHospitals = HOSPITALS.filter(h =>
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredGarages = GARAGES.filter(g =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.address.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50">
            <SiteHeader />

            <main className="flex-1 pb-12 pt-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-slate-900">Network Providers</h1>
                        <p className="text-slate-500 mt-2">Find cashless hospitals and garages near you.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Filters & List */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg">Find Nearby</CardTitle>
                                    <CardDescription>Search for network providers</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">City</label>
                                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select city" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                                <SelectItem value="bangalore">Bangalore</SelectItem>
                                                <SelectItem value="mumbai">Mumbai</SelectItem>
                                                <SelectItem value="delhi">Delhi</SelectItem>
                                                <SelectItem value="chennai">Chennai</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Search</label>
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="Search by name or area..."
                                                className="pl-9"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Tabs defaultValue="hospitals" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 mb-4">
                                    <TabsTrigger value="hospitals" className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4" />
                                        Hospitals
                                    </TabsTrigger>
                                    <TabsTrigger value="garages" className="flex items-center gap-2">
                                        <Car className="h-4 w-4" />
                                        Garages
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="hospitals" className="mt-0">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-4"
                                    >
                                        {filteredHospitals.map((hospital) => (
                                            <motion.div key={hospital.id} variants={itemVariants}>
                                                <ProviderCard provider={hospital} icon={<Building2 className="h-5 w-5 text-rose-500" />} />
                                            </motion.div>
                                        ))}
                                        {filteredHospitals.length === 0 && (
                                            <div className="text-center py-8 text-slate-500">
                                                No hospitals found matching your search.
                                            </div>
                                        )}
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="garages" className="mt-0">
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="space-y-4"
                                    >
                                        {filteredGarages.map((garage) => (
                                            <motion.div key={garage.id} variants={itemVariants}>
                                                <ProviderCard provider={garage} icon={<Car className="h-5 w-5 text-blue-500" />} />
                                            </motion.div>
                                        ))}
                                        {filteredGarages.length === 0 && (
                                            <div className="text-center py-8 text-slate-500">
                                                No garages found matching your search.
                                            </div>
                                        )}
                                    </motion.div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Right Column: Map Placeholder */}
                        <div className="lg:col-span-2">
                            <Card className="h-[calc(100vh-12rem)] border-slate-200 shadow-sm overflow-hidden sticky top-24">
                                <div className="h-full w-full bg-slate-100 relative group">
                                    {/* Map Background Pattern */}
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                                            backgroundSize: '20px 20px'
                                        }}>
                                    </div>

                                    {/* Center Message */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                        <MapPin className="h-16 w-16 mb-4 text-slate-300" />
                                        <p className="text-lg font-medium">Interactive Map View</p>
                                        <p className="text-sm">Google Maps integration coming soon</p>
                                    </div>

                                    {/* Mock Map Pins */}
                                    {(activeTab === 'hospitals' ? filteredHospitals : filteredGarages).map((provider, i) => (
                                        <motion.div
                                            key={provider.id}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:z-10"
                                            style={{
                                                top: `${30 + (i * 15) % 60}%`,
                                                left: `${20 + (i * 20) % 70}%`
                                            }}
                                        >
                                            <div className={`
                        relative flex items-center justify-center h-10 w-10 rounded-full shadow-lg border-2 border-white
                        ${activeTab === 'hospitals' ? 'bg-rose-500' : 'bg-blue-500'}
                        text-white transition-transform hover:scale-110
                      `}>
                                                {activeTab === 'hospitals' ? <Building2 className="h-5 w-5" /> : <Car className="h-5 w-5" />}

                                                {/* Tooltip */}
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white text-slate-800 text-xs rounded-lg shadow-xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 hidden group-hover:block">
                                                    <p className="font-bold">{provider.name}</p>
                                                    <p className="text-slate-500 truncate">{provider.address}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}

function ProviderCard({ provider, icon }: { provider: any, icon: any }) {
    return (
        <Card className="hover:shadow-md transition-shadow border-slate-200 cursor-pointer group">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-slate-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                        {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-slate-900 truncate pr-2">{provider.name}</h3>
                            {provider.cashless && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100 text-[10px] h-5">
                                    Cashless
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{provider.address}</p>

                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                            <div className="flex items-center gap-1">
                                <Navigation className="h-3 w-3" />
                                {provider.distance}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-amber-500 font-bold">★</span>
                                {provider.rating}
                            </div>
                        </div>

                        <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline" className="w-full h-8 text-xs">
                                <Phone className="h-3 w-3 mr-1.5" />
                                Call
                            </Button>
                            <Button size="sm" className="w-full h-8 text-xs bg-slate-900 text-white hover:bg-slate-800">
                                <Navigation className="h-3 w-3 mr-1.5" />
                                Navigate
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
