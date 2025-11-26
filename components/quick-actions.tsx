"use client"

import { Card } from "@/components/ui/card"
import { RefreshCw, ShoppingCart, FileText, Search, Download, ShieldCheck, Phone, KeyRound, MapPin } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    { icon: RefreshCw, label: "Renew Policy", href: "/renew", color: "text-blue-600" },
    { icon: ShoppingCart, label: "Buy New Policy", href: "/buy", color: "text-green-600" },
    { icon: FileText, label: "File a Claim", href: "/customer/claims/new", color: "text-orange-600" },
    { icon: Search, label: "Track Claim", href: "/customer/claims", color: "text-purple-600" },
    { icon: Download, label: "Download Policy", href: "/customer/policies", color: "text-teal-600" },
    { icon: ShieldCheck, label: "Policy Verification", href: "/verify", color: "text-indigo-600" },
    { icon: Phone, label: "Change Mobile/Email", href: "/customer/profile", color: "text-pink-600" },
    { icon: KeyRound, label: "Update KYC", href: "/auth/kyc", color: "text-yellow-600" },
    { icon: MapPin, label: "Locate Network", href: "/network", color: "text-red-600" },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-9">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card className="group cursor-pointer border-2 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 transition-transform group-hover:scale-110">
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-xs font-medium leading-tight">{action.label}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
