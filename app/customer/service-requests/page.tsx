"use client"

import { useState, useEffect } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Edit,
  MapPin,
  User,
  FileText,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  Send,
} from "lucide-react"

type ServiceRequest = {
  id: string
  type: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  createdDate: string
  updatedDate: string
  policyNumber?: string
}

const requestTypes = [
  { value: "address-change", label: "Address Change", icon: MapPin },
  { value: "nomination-change", label: "Nomination Change", icon: User },
  { value: "policy-correction", label: "Policy Correction", icon: FileText },
  { value: "contact-update", label: "Contact Update", icon: Phone },
  { value: "email-update", label: "Email Update", icon: Mail },
  { value: "other", label: "Other Request", icon: Edit },
]

export default function ServiceRequestsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all")

  // Form state
  const [requestType, setRequestType] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Mock data
  const mockRequests: ServiceRequest[] = [
    {
      id: "req_001",
      type: "address-change",
      title: "Address Change Request",
      description: "Update address from Mumbai to Pune",
      status: "in-progress",
      createdDate: "2024-11-20",
      updatedDate: "2024-11-22",
      policyNumber: "HLT/2024/001234",
    },
    {
      id: "req_002",
      type: "nomination-change",
      title: "Nomination Update",
      description: "Add spouse as nominee",
      status: "completed",
      createdDate: "2024-11-10",
      updatedDate: "2024-11-15",
      policyNumber: "CAR/2024/005678",
    },
  ]

  const filteredRequests = mockRequests.filter((req) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return req.status === "pending" || req.status === "in-progress"
    if (activeTab === "completed") return req.status === "completed"
    return true
  })

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Request Submitted",
      description: "Your service request has been submitted successfully. We'll process it within 2-3 business days.",
    })
    setShowNewRequest(false)
    setRequestType("")
    setPolicyNumber("")
    setDescription("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <CustomerLayout>
        <div className="space-y-6">
          <Skeleton className="h-24 rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
            <Skeleton className="h-32 rounded-3xl" />
          </div>
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </CustomerLayout>
    )
  }

  return (
    <CustomerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Service Requests</h1>
            <p className="text-muted-foreground">
              Manage policy changes, updates, and other service requests
            </p>
          </div>
          <Button onClick={() => setShowNewRequest(!showNewRequest)} className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" />
            New Request
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 p-3">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                  <div className="text-3xl font-bold">
                    {mockRequests.filter((r) => r.status === "pending" || r.status === "in-progress").length}
                  </div>
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
                  <div className="text-sm text-muted-foreground">Completed</div>
                  <div className="text-3xl font-bold">
                    {mockRequests.filter((r) => r.status === "completed").length}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Requests</div>
                  <div className="text-3xl font-bold">{mockRequests.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* New Request Form */}
        {showNewRequest && (
          <Card className="shadow-lg rounded-3xl border-2 border-primary">
            <CardHeader>
              <CardTitle>Submit New Service Request</CardTitle>
              <CardDescription>Fill in the details below to submit your request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="request-type">Request Type *</Label>
                  <Select value={requestType} onValueChange={setRequestType} required>
                    <SelectTrigger id="request-type" className="rounded-xl">
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policy-number">Policy Number (Optional)</Label>
                  <Input
                    id="policy-number"
                    placeholder="e.g., HLT/2024/001234"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide details about your request..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={4}
                    className="rounded-xl"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowNewRequest(false)} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2 rounded-xl">
                    <Send className="h-4 w-4" />
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Requests List */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3 rounded-2xl">
            <TabsTrigger value="all" className="rounded-xl">
              All ({mockRequests.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-xl">
              Pending ({mockRequests.filter((r) => r.status === "pending" || r.status === "in-progress").length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-xl">
              Completed ({mockRequests.filter((r) => r.status === "completed").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => {
                const requestTypeInfo = requestTypes.find((t) => t.value === request.type)
                const Icon = requestTypeInfo?.icon || Edit
                return (
                  <Card key={request.id} className="shadow-lg rounded-3xl hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-full bg-primary/10 p-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{request.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                            {request.policyNumber && (
                              <p className="text-xs text-muted-foreground">Policy: {request.policyNumber}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1 capitalize">{request.status.replace("-", " ")}</span>
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div>
                          <span>Created: {new Date(request.createdDate).toLocaleDateString("en-IN")}</span>
                        </div>
                        <div>
                          <span>Updated: {new Date(request.updatedDate).toLocaleDateString("en-IN")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <EmptyState
                icon={FileText}
                title="No Service Requests"
                description="You haven't submitted any service requests yet. Click 'New Request' to get started."
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="shadow-lg rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle>Common Service Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {requestTypes.map((type) => {
                const Icon = type.icon
                return (
                  <div key={type.value} className="flex items-start gap-3 p-3 bg-white rounded-xl">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{type.label}</h4>
                      <p className="text-xs text-muted-foreground">
                        {type.value === "address-change" && "Update your residential address"}
                        {type.value === "nomination-change" && "Add or update nominee details"}
                        {type.value === "policy-correction" && "Correct policy information"}
                        {type.value === "contact-update" && "Update phone number"}
                        {type.value === "email-update" && "Change email address"}
                        {type.value === "other" && "Any other service request"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  )
}
