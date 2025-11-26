import type { User } from "@/lib/store/auth-store"

export const mockUsers: User[] = [
  {
    id: "usr_001",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "customer",
    phone: "+91 98765 43210",
    kycStatus: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "usr_002",
    email: "priya.patel@example.com",
    name: "Priya Patel",
    role: "customer",
    phone: "+91 98765 43211",
    kycStatus: "in-progress",
  },
  {
    id: "agt_001",
    email: "amit.verma@insureco.com",
    name: "Amit Verma",
    role: "agent",
    phone: "+91 98765 43220",
    kycStatus: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "adm_001",
    email: "admin@insureco.com",
    name: "Admin User",
    role: "admin",
    phone: "+91 98765 43230",
    kycStatus: "completed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
