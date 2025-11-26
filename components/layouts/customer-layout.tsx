"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTranslation } from "@/lib/i18n/use-translation"
import { useAuthStore } from "@/lib/store/auth-store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  FileText,
  AlertCircle,
  CreditCard,
  User,
  HelpCircle,
  LogOut,
  Shield,
  X,
  Bell,
  MapPin,
  FileCheck,
  ShoppingBag,
  RefreshCw,
  Edit,
  Settings,
  Menu,
  Search,
  Globe,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

// Organized navigation structure
const navigationSections = [
  {
    title: "Overview",
    items: [{ name: "Dashboard", icon: LayoutDashboard, href: "/customer/dashboard" }],
  },
  {
    title: "Products & Policies",
    items: [
      { name: "Explore Products", icon: ShoppingBag, href: "/products" },
      { name: "My Policies", icon: FileText, href: "/customer/policies" },
      { name: "Renewals", icon: RefreshCw, href: "/renew" },
    ],
  },
  {
    title: "Services",
    items: [
      { name: "Claims", icon: AlertCircle, href: "/customer/claims" },
      { name: "Service Requests", icon: Edit, href: "/customer/service-requests" },
      { name: "Payments", icon: CreditCard, href: "/customer/payments" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "KYC Verification", icon: FileCheck, href: "/customer/kyc" },
      { name: "My Profile", icon: User, href: "/customer/profile" },
      { name: "Network", icon: MapPin, href: "/customer/network" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", icon: HelpCircle, href: "/customer/support" },
      { name: "Chat Support", icon: MessageCircle, href: "/customer/support" },
    ],
  },
]

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    title: "Policy Renewal Due",
    message: "Your health insurance expires in 30 days",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    title: "Claim Approved",
    message: "Your claim #CLM123 has been approved for ₹15,000",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Premium payment of ₹12,000 received successfully",
    time: "3 days ago",
    unread: false,
  },
]

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const unreadCount = mockNotifications.filter((n) => n.unread).length

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b bg-white/80 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/customer/dashboard" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="hidden font-bold text-foreground sm:inline">Smart Insurance</span>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="hidden flex-1 max-w-md mx-8 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search policies, claims, products..."
                className="w-full rounded-full border-2 pl-10 pr-4"
              />
            </div>
          </div>

          {/* Right: Notifications + Language + Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-500">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="rounded-full">
                      {unreadCount} new
                    </Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start gap-1 p-4 cursor-pointer"
                    >
                      <div className="flex items-start justify-between w-full">
                        <p className="font-semibold text-sm">{notification.title}</p>
                        {notification.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary cursor-pointer">
                  View All Notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>हिंदी (Hindi)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:bg-accent p-1 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium lg:inline">{user?.name?.split(" ")[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/customer/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/customer/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Curved Sidebar */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-64 transform bg-white border-r transition-transform duration-300 ease-in-out lg:translate-x-0",
          "rounded-tr-[32px] shadow-xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation - Organized by Sections */}
          <nav className="flex-1 space-y-6 overflow-y-auto p-4 pt-6">
            {navigationSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 rounded-xl transition-all",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "hover:bg-accent hover:text-accent-foreground"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Button>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Settings at Bottom */}
          <div className="border-t p-4">
            <Link href="/customer/settings">
              <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        <main className="flex-1 p-4 pt-20 lg:p-8 lg:pt-24">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
