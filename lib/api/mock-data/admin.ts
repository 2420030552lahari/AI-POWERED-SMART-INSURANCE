export type AuditLog = {
  id: string
  userId: string
  userName: string
  action: string
  details: string
  timestamp: string
  ipAddress: string
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: "log_001",
    userId: "usr_001",
    userName: "Rahul Sharma",
    action: "policy_purchased",
    details: "Purchased Health Insurance policy HLT/2024/001234",
    timestamp: "2024-11-20 14:30:22",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log_002",
    userId: "agt_001",
    userName: "Amit Verma",
    action: "lead_created",
    details: "Created new lead for Anita Desai",
    timestamp: "2024-11-20 12:15:10",
    ipAddress: "192.168.1.2",
  },
  {
    id: "log_003",
    userId: "usr_001",
    userName: "Rahul Sharma",
    action: "claim_filed",
    details: "Filed claim CLM/2024/HLT/0001 for ₹45,000",
    timestamp: "2024-11-19 16:45:33",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log_004",
    userId: "adm_001",
    userName: "Admin User",
    action: "claim_approved",
    details: "Approved claim CLM/2024/VEH/0012",
    timestamp: "2024-11-19 10:20:15",
    ipAddress: "192.168.1.3",
  },
]

export type ProductTemplate = {
  id: string
  name: string
  type: string
  basePremium: number
  coverageOptions: number[]
  features: string[]
  status: "active" | "inactive" | "draft"
  createdAt: string
}

export const mockProductTemplates: ProductTemplate[] = [
  {
    id: "tpl_001",
    name: "Health Shield Plus",
    type: "health",
    basePremium: 12000,
    coverageOptions: [300000, 500000, 1000000],
    features: ["Cashless hospitalization", "No claim bonus", "Pre and post hospitalization"],
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "tpl_002",
    name: "Life Protect Term",
    type: "life",
    basePremium: 10000,
    coverageOptions: [2500000, 5000000, 10000000],
    features: ["Tax benefits", "Accidental death benefit", "Terminal illness benefit"],
    status: "active",
    createdAt: "2024-02-20",
  },
]
