export type ClaimType = "health" | "vehicle" | "life" | "home"
export type ClaimStatus = "pending" | "under-review" | "approved" | "rejected" | "settled"

export type Claim = {
  id: string
  claimNumber: string
  policyId: string
  policyNumber: string
  userId: string
  type: ClaimType
  amount: number
  status: ClaimStatus
  filedDate: string
  description: string
  fraudScore?: number
  documents: string[]
  timeline: {
    date: string
    status: string
    description: string
  }[]
}

// Start with empty claims for fresh user experience
// Users can file new claims through the application
export const mockClaims: Claim[] = []
