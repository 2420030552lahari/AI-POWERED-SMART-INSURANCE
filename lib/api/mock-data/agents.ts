export type Lead = {
  id: string
  name: string
  email: string
  phone: string
  type: "health" | "life" | "vehicle" | "home"
  status: "new" | "contacted" | "quoted" | "converted" | "lost"
  source: string
  createdAt: string
  expectedPremium?: number
  notes?: string
}

export type Commission = {
  id: string
  policyNumber: string
  customerName: string
  policyType: string
  premium: number
  commissionRate: number
  commissionAmount: number
  status: "pending" | "paid" | "processing"
  paidDate?: string
  createdAt: string
}

export const mockLeads: Lead[] = [
  {
    id: "lead_001",
    name: "Anita Desai",
    email: "anita.desai@example.com",
    phone: "+91 98765 11111",
    type: "health",
    status: "new",
    source: "Website",
    createdAt: "2024-11-20",
    expectedPremium: 15000,
  },
  {
    id: "lead_002",
    name: "Vijay Kumar",
    email: "vijay.kumar@example.com",
    phone: "+91 98765 22222",
    type: "vehicle",
    status: "contacted",
    source: "Referral",
    createdAt: "2024-11-18",
    expectedPremium: 8500,
    notes: "Interested in comprehensive car insurance",
  },
  {
    id: "lead_003",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    phone: "+91 98765 33333",
    type: "life",
    status: "quoted",
    source: "Cold Call",
    createdAt: "2024-11-15",
    expectedPremium: 12000,
  },
  {
    id: "lead_004",
    name: "Rajesh Mehta",
    email: "rajesh.mehta@example.com",
    phone: "+91 98765 44444",
    type: "health",
    status: "converted",
    source: "Website",
    createdAt: "2024-11-10",
    expectedPremium: 18000,
  },
]

export const mockCommissions: Commission[] = [
  {
    id: "comm_001",
    policyNumber: "HLT/2024/001234",
    customerName: "Rahul Sharma",
    policyType: "Health Insurance",
    premium: 15000,
    commissionRate: 15,
    commissionAmount: 2250,
    status: "paid",
    paidDate: "2024-11-05",
    createdAt: "2024-11-01",
  },
  {
    id: "comm_002",
    policyNumber: "VEH/2024/005678",
    customerName: "Priya Patel",
    policyType: "Vehicle Insurance",
    premium: 8500,
    commissionRate: 12,
    commissionAmount: 1020,
    status: "processing",
    createdAt: "2024-11-15",
  },
  {
    id: "comm_003",
    policyNumber: "LIFE/2024/009876",
    customerName: "Amit Verma",
    policyType: "Life Insurance",
    premium: 12000,
    commissionRate: 20,
    commissionAmount: 2400,
    status: "pending",
    createdAt: "2024-11-20",
  },
]
