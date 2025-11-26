"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Car, Heart, Plane, Home } from "lucide-react"
import { Card } from "@/components/ui/card"

export function QuoteSearchBar() {
  const [selectedProduct, setSelectedProduct] = useState("motor")
  const router = useRouter()

  const handleGetQuote = () => {
    if (selectedProduct === "motor") {
      router.push("/buy")
    } else {
      router.push(`/products/${selectedProduct}`)
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center gap-4">
        <Button
          variant={selectedProduct === "motor" ? "default" : "outline"}
          onClick={() => setSelectedProduct("motor")}
          className="gap-2"
        >
          <Car className="h-4 w-4" />
          Motor
        </Button>
        <Button
          variant={selectedProduct === "health" ? "default" : "outline"}
          onClick={() => setSelectedProduct("health")}
          className="gap-2"
        >
          <Heart className="h-4 w-4" />
          Health
        </Button>
        <Button
          variant={selectedProduct === "travel" ? "default" : "outline"}
          onClick={() => setSelectedProduct("travel")}
          className="gap-2"
        >
          <Plane className="h-4 w-4" />
          Travel
        </Button>
        <Button
          variant={selectedProduct === "home" ? "default" : "outline"}
          onClick={() => setSelectedProduct("home")}
          className="gap-2"
        >
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>

      {selectedProduct === "motor" && (
        <div className="grid gap-4 md:grid-cols-4">
          <Input placeholder="Enter Vehicle Number (e.g., MH01AB1234)" className="border-2" />
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
              <SelectItem value="hyderabad">Hyderabad</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" placeholder="Date of Birth" className="border-2" />
          <Button className="gap-2 shadow-lg" onClick={handleGetQuote}>
            <Search className="h-4 w-4" />
            Get Quotes
          </Button>
        </div>
      )}

      {selectedProduct === "health" && (
        <div className="grid gap-4 md:grid-cols-4">
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" placeholder="Date of Birth" className="border-2" />
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Individual</SelectItem>
              <SelectItem value="2">Self + Spouse</SelectItem>
              <SelectItem value="4">Family Floater</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 shadow-lg" onClick={handleGetQuote}>
            <Search className="h-4 w-4" />
            Get Quotes
          </Button>
        </div>
      )}

      {selectedProduct === "travel" && (
        <div className="grid gap-4 md:grid-cols-4">
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="domestic">Domestic</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="worldwide">Worldwide</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" placeholder="Start Date" className="border-2" />
          <Input type="date" placeholder="End Date" className="border-2" />
          <Button className="gap-2 shadow-lg" onClick={handleGetQuote}>
            <Search className="h-4 w-4" />
            Get Quotes
          </Button>
        </div>
      )}

      {selectedProduct === "home" && (
        <div className="grid gap-4 md:grid-cols-4">
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">Independent House</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Property Value" className="border-2" />
          <Select>
            <SelectTrigger className="border-2">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 shadow-lg" onClick={handleGetQuote}>
            <Search className="h-4 w-4" />
            Get Quotes
          </Button>
        </div>
      )}
    </Card>
  )
}
