export type PolicyType = "health" | "life" | "vehicle" | "home" | "travel"
export type PolicyStatus = "active" | "expired" | "pending" | "cancelled"

export type Policy = {
  id: string
  policyNumber: string
  userId: string
  type: PolicyType
  name: string
  premium: number
  coverageAmount: number
  status: PolicyStatus
  startDate: string
  endDate: string
  renewalDate: string
  description: string
}

// Start with empty policies for fresh user experience
// Users can purchase new policies through the application
export const mockPolicies: Policy[] = [
  {
    id: "pol_001",
    policyNumber: "INS-2025-001",
    userId: "usr_001",
    type: "health",
    name: "Health Shield Plus",
    premium: 12000,
    coverageAmount: 500000,
    status: "active",
    startDate: "2025-01-01",
    endDate: "2026-01-01",
    renewalDate: "2025-12-01",
    description: "Comprehensive health coverage for you and your family",
  },
  {
    id: "pol_002",
    policyNumber: "INS-2025-002",
    userId: "usr_001",
    type: "vehicle",
    name: "Car Shield Comprehensive",
    premium: 7500,
    coverageAmount: 1000000,
    status: "active",
    startDate: "2025-03-15",
    endDate: "2026-03-15",
    renewalDate: "2025-12-15",
    description: "Complete protection for your vehicle",
  },
  {
    id: "pol_003",
    policyNumber: "INS-2025-003",
    userId: "usr_001",
    type: "life",
    name: "Life Protect Term",
    premium: 10000,
    coverageAmount: 5000000,
    status: "active",
    startDate: "2025-02-01",
    endDate: "2026-02-01",
    renewalDate: "2026-01-01",
    description: "Affordable term insurance with high coverage",
  },
  {
    id: "pol_004",
    policyNumber: "INS-2025-004",
    userId: "usr_001",
    type: "home",
    name: "Home Guard Plus",
    premium: 8500,
    coverageAmount: 2000000,
    status: "active",
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    renewalDate: "2025-12-15",
    description: "Complete home and contents insurance",
  },
  {
    id: "pol_005",
    policyNumber: "INS-2025-005",
    userId: "usr_001",
    type: "travel",
    name: "Travel Safe International",
    premium: 3500,
    coverageAmount: 1000000,
    status: "active",
    startDate: "2025-03-01",
    endDate: "2026-03-01",
    renewalDate: "2026-02-01",
    description: "International travel insurance with medical coverage",
  },
  {
    id: "pol_006",
    policyNumber: "INS-2025-006",
    userId: "usr_002",
    type: "health",
    name: "Family Health Shield",
    premium: 15000,
    coverageAmount: 1000000,
    status: "active",
    startDate: "2025-01-10",
    endDate: "2026-01-10",
    renewalDate: "2025-12-10",
    description: "Family floater health insurance plan",
  },
];

export const mockInsuranceProducts = [
  {
    id: "prod_h1",
    type: "health" as PolicyType,
    name: "Health Shield Plus",
    description: "Comprehensive health coverage for you and your family",
    basePremium: 12000,
    coverageOptions: [300000, 500000, 1000000],
    features: ["Cashless hospitalization", "No claim bonus", "Pre and post hospitalization"],
  },
  {
    id: "prod_l1",
    type: "life" as PolicyType,
    name: "Life Protect Term",
    description: "Affordable term insurance with high coverage",
    basePremium: 10000,
    coverageOptions: [2500000, 5000000, 10000000],
    features: ["Tax benefits", "Accidental death benefit", "Terminal illness benefit"],
  },
  {
    id: "prod_v1",
    type: "vehicle" as PolicyType,
    name: "Car Shield Comprehensive",
    description: "Complete protection for your vehicle",
    basePremium: 7500,
    coverageOptions: [500000, 1000000, 2000000],
    features: ["Zero depreciation", "Engine protection", "Roadside assistance"],
  },
]
