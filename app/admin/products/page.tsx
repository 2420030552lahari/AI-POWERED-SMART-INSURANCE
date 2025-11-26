"use client"

import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Plus, Edit, Eye } from "lucide-react"
import { mockProductTemplates } from "@/lib/api/mock-data/admin"

export default function ProductsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">Configure insurance product templates</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="grid gap-4">
          {mockProductTemplates.map((product) => (
            <Card key={product.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            product.status === "active"
                              ? "bg-success/10 text-success"
                              : product.status === "inactive"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-warning/10 text-warning"
                          }
                        >
                          {product.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{product.type} Insurance</p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span>Base Premium: ₹{product.basePremium.toLocaleString()}</span>
                        <span>•</span>
                        <span>Coverage Options: {product.coverageOptions.length}</span>
                        <span>•</span>
                        <span>Features: {product.features.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
