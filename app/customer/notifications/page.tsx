"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCheck, Trash2, AlertCircle, FileText, Gift, Shield, Calendar } from "lucide-react"

type Notification = {
  id: string
  title: string
  message: string
  type: "renewal" | "claim" | "kyc" | "policy" | "offer"
  read: boolean
  timestamp: string
  action?: { label: string; href: string }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "not_001",
      title: "Policy Renewal Due",
      message:
        "Your Comprehensive Health Insurance (HLT/2024/001234) is due for renewal in 15 days. Renew now to avoid coverage gaps.",
      type: "renewal",
      read: false,
      timestamp: "2 hours ago",
      action: { label: "Renew Now", href: "/renew?policy=HLT/2024/001234" },
    },
    {
      id: "not_002",
      title: "Claim Approved",
      message:
        "Your claim (CLM-2024-00123) for ₹25,000 has been approved. The amount will be credited to your account within 3-5 business days.",
      type: "claim",
      read: false,
      timestamp: "5 hours ago",
      action: { label: "View Details", href: "/customer/claims/clm_001" },
    },
    {
      id: "not_003",
      title: "KYC Verification Required",
      message: "Your KYC documents are pending verification. Complete your KYC to ensure uninterrupted service.",
      type: "kyc",
      read: true,
      timestamp: "1 day ago",
      action: { label: "Complete KYC", href: "/customer/kyc" },
    },
    {
      id: "not_004",
      title: "New Policy Issued",
      message: "Congratulations! Your new Car Insurance policy (VEH/2024/005678) has been issued successfully.",
      type: "policy",
      read: true,
      timestamp: "2 days ago",
      action: { label: "View Policy", href: "/customer/policies/pol_002" },
    },
    {
      id: "not_005",
      title: "Special Offer: 20% Off on Health Plans",
      message: "Limited time offer! Get 20% discount on all health insurance plans. Valid till end of month.",
      type: "offer",
      read: true,
      timestamp: "3 days ago",
      action: { label: "Explore Plans", href: "/products/health" },
    },
    {
      id: "not_006",
      title: "Claim Under Review",
      message:
        "Your claim (CLM-2024-00124) is currently under review by our team. Expected resolution in 2-3 business days.",
      type: "claim",
      read: true,
      timestamp: "5 days ago",
    },
    {
      id: "not_007",
      title: "Premium Payment Successful",
      message: "Your premium payment of ₹15,000 for policy HLT/2024/001234 has been received successfully.",
      type: "policy",
      read: true,
      timestamp: "1 week ago",
    },
  ])

  const unreadNotifications = notifications.filter((n) => !n.read)
  const allNotifications = notifications

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "renewal":
        return <Calendar className="h-5 w-5 text-warning" />
      case "claim":
        return <AlertCircle className="h-5 w-5 text-primary" />
      case "kyc":
        return <Shield className="h-5 w-5 text-accent" />
      case "policy":
        return <FileText className="h-5 w-5 text-success" />
      case "offer":
        return <Gift className="h-5 w-5 text-pink-500" />
    }
  }

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className={`shadow-card ${!notification.read ? "border-primary/30" : ""}`}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className={`rounded-full p-2 ${!notification.read ? "bg-primary/10" : "bg-muted"}`}>
          {getIcon(notification.type)}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{notification.title}</h3>
                {!notification.read && (
                  <Badge variant="default" className="h-5 px-1.5 text-xs">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">{notification.timestamp}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {notification.action && (
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => markAsRead(notification.id)}>
                {notification.action.label}
              </Button>
              {!notification.read && (
                <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                  Mark as read
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your insurance activities</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent" onClick={markAllAsRead}>
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-2xl font-bold">{allNotifications.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-warning/10 p-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Unread</div>
                  <div className="text-2xl font-bold">{unreadNotifications.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-success/10 p-2">
                  <CheckCheck className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Read</div>
                  <div className="text-2xl font-bold">{allNotifications.length - unreadNotifications.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({allNotifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {allNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCheck className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 font-semibold">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">You have no unread notifications</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  )
}
