"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Phone,
  Clock,
  Navigation,
  Hospital,
  Wrench,
  CheckCircle2,
  Map,
  List,
  ExternalLink,
} from "lucide-react"

type NetworkProvider = {
  id: string
  name: string
  type: "garage" | "hospital"
  address: string
  city: string
  pincode: string
  phone: string
  cashless: boolean
  rating: number
  timings: string
  distance: string
  lat: number
  lng: number
}

export default function NetworkPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState("all")
  const [activeTab, setActiveTab] = useState<"all" | "garage" | "hospital">("all")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedProvider, setSelectedProvider] = useState<NetworkProvider | null>(null)

  const networkProviders: NetworkProvider[] = [
    {
      id: "net_001",
      name: "Apollo Hospitals",
      type: "hospital",
      address: "123, M.G. Road, Fort",
      city: "Mumbai",
      pincode: "400001",
      phone: "+91 22 1234 5678",
      cashless: true,
      rating: 4.8,
      timings: "24x7",
      distance: "2.5 km",
      lat: 18.9322,
      lng: 72.8264,
    },
    {
      id: "net_002",
      name: "Fortis Healthcare",
      type: "hospital",
      address: "456, Linking Road, Bandra West",
      city: "Mumbai",
      pincode: "400050",
      phone: "+91 22 2345 6789",
      cashless: true,
      rating: 4.6,
      timings: "24x7",
      distance: "5.2 km",
      lat: 19.0596,
      lng: 72.8295,
    },
    {
      id: "net_003",
      name: "Max Auto Care",
      type: "garage",
      address: "789, Western Express Highway, Andheri",
      city: "Mumbai",
      pincode: "400053",
      phone: "+91 22 3456 7890",
      cashless: true,
      rating: 4.5,
      timings: "9:00 AM - 8:00 PM",
      distance: "3.8 km",
      lat: 19.1136,
      lng: 72.8697,
    },
    {
      id: "net_004",
      name: "Bosch Car Service",
      type: "garage",
      address: "321, S.V. Road, Goregaon West",
      city: "Mumbai",
      pincode: "400062",
      phone: "+91 22 4567 8901",
      cashless: true,
      rating: 4.7,
      timings: "9:00 AM - 7:00 PM",
      distance: "7.1 km",
      lat: 19.1663,
      lng: 72.8526,
    },
    {
      id: "net_005",
      name: "Lilavati Hospital",
      type: "hospital",
      address: "A-791, Bandra Reclamation",
      city: "Mumbai",
      pincode: "400050",
      phone: "+91 22 5678 9012",
      cashless: true,
      rating: 4.9,
      timings: "24x7",
      distance: "4.3 km",
      lat: 19.0521,
      lng: 72.8224,
    },
    {
      id: "net_006",
      name: "Supreme Motors",
      type: "garage",
      address: "567, Linking Road, Santacruz West",
      city: "Mumbai",
      pincode: "400054",
      phone: "+91 22 6789 0123",
      cashless: false,
      rating: 4.2,
      timings: "10:00 AM - 6:00 PM",
      distance: "6.5 km",
      lat: 19.0825,
      lng: 72.8384,
    },
  ]

  const filteredProviders = networkProviders.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.pincode.includes(searchQuery)
    const matchesCity = selectedCity === "all" || provider.city === selectedCity
    const matchesType = activeTab === "all" || provider.type === activeTab
    return matchesSearch && matchesCity && matchesType
  })

  const cities = Array.from(new Set(networkProviders.map((p) => p.city)))
  const garageCount = networkProviders.filter((p) => p.type === "garage").length
  const hospitalCount = networkProviders.filter((p) => p.type === "hospital").length

  const getGoogleMapsUrl = (provider: NetworkProvider) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${provider.lat},${provider.lng}&travelmode=driving`
  }

  const getEmbedMapUrl = (provider: NetworkProvider) => {
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
      provider.name + ", " + provider.address
    )}&zoom=15`
  }

  const ProviderCard = ({ provider }: { provider: NetworkProvider }) => (
    <Card className="shadow-lg rounded-3xl hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <div
                className={`rounded-full p-3 ${provider.type === "hospital" ? "bg-blue-100" : "bg-amber-100"}`}
              >
                {provider.type === "hospital" ? (
                  <Hospital className="h-6 w-6 text-blue-600" />
                ) : (
                  <Wrench className="h-6 w-6 text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold">{provider.name}</h3>
                  {provider.cashless && (
                    <Badge className="gap-1 bg-green-100 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Cashless
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 border border-amber-200">
                    <span className="text-sm font-semibold text-amber-700">⭐ {provider.rating}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {provider.address}, {provider.city} - {provider.pincode}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{provider.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{provider.timings}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Navigation className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">{provider.distance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              className="gap-2 rounded-xl"
              onClick={() => window.open(getGoogleMapsUrl(provider), "_blank")}
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 rounded-xl"
              onClick={() => setSelectedProvider(provider)}
            >
              <Map className="h-4 w-4" />
              View Map
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Network Providers</h1>
            <p className="text-muted-foreground">Find cashless garages and hospitals near you</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="gap-2 rounded-xl"
            >
              <List className="h-4 w-4" />
              List
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="gap-2 rounded-xl"
            >
              <Map className="h-4 w-4" />
              Map
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Hospitals</div>
                  <div className="text-3xl font-bold">{hospitalCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Wrench className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Garages</div>
                  <div className="text-3xl font-bold">{garageCount}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Cashless</div>
                  <div className="text-3xl font-bold">{networkProviders.filter((p) => p.cashless).length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg rounded-3xl">
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, address or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">
              All ({networkProviders.length})
            </TabsTrigger>
            <TabsTrigger value="hospital" className="rounded-xl">
              Hospitals ({hospitalCount})
            </TabsTrigger>
            <TabsTrigger value="garage" className="rounded-xl">
              Garages ({garageCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {viewMode === "list" ? (
              <>
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
                {filteredProviders.length === 0 && (
                  <Card className="shadow-lg rounded-3xl">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
                      <h3 className="mb-2 text-xl font-semibold">No providers found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search filters</p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-[600px] bg-muted flex items-center justify-center relative">
                    {/* Map Placeholder with Instructions */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-8 text-center">
                      <Map className="h-16 w-16 text-primary mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Interactive Map View</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        To enable real-time map view, integrate Google Maps API or Mapbox. Click on any provider
                        below to view their location.
                      </p>
                      <div className="grid gap-2 w-full max-w-md">
                        {filteredProviders.slice(0, 3).map((provider) => (
                          <Button
                            key={provider.id}
                            variant="outline"
                            className="w-full justify-between rounded-xl bg-white"
                            onClick={() => window.open(getGoogleMapsUrl(provider), "_blank")}
                          >
                            <span className="flex items-center gap-2">
                              {provider.type === "hospital" ? (
                                <Hospital className="h-4 w-4" />
                              ) : (
                                <Wrench className="h-4 w-4" />
                              )}
                              {provider.name}
                            </span>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Selected Provider Map Modal */}
        {selectedProvider && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProvider(null)}
          >
            <Card className="w-full max-w-4xl shadow-2xl rounded-3xl" onClick={(e) => e.stopPropagation()}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedProvider.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProvider.address}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProvider(null)}>
                    <span className="text-2xl">×</span>
                  </Button>
                </div>
                <div className="h-96 bg-muted rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <Map className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Map integration requires Google Maps API key</p>
                    <Button onClick={() => window.open(getGoogleMapsUrl(selectedProvider), "_blank")}>
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
