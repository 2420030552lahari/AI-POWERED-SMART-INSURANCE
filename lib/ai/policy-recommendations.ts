export interface PolicyRecommendation {
  id: string
  type: "health" | "life" | "vehicle" | "home"
  name: string
  coverage: number
  premium: number
  reason: string
  aiScore: number
  benefits: string[]
}

export function getAIPolicyRecommendations(
  userAge: number,
  currentCoverage: number,
  dependents: number,
): PolicyRecommendation[] {
  const recommendations: PolicyRecommendation[] = []

  // Health insurance recommendation
  if (currentCoverage < 1000000) {
    recommendations.push({
      id: "rec-health-1",
      type: "health",
      name: "Family Health Shield Pro",
      coverage: 1000000,
      premium: 18000,
      reason:
        "Your current coverage may not be sufficient for family medical emergencies. This plan offers better protection.",
      aiScore: 92,
      benefits: [
        "₹10 Lakh coverage for entire family",
        "Covers pre-existing diseases after 2 years",
        "No claim bonus up to 100%",
        "Free annual health checkups",
      ],
    })
  }

  // Life insurance recommendation
  if (userAge < 45 && dependents > 0) {
    recommendations.push({
      id: "rec-life-1",
      type: "life",
      name: "Term Life Protect Plus",
      coverage: 5000000,
      premium: 12000,
      reason: "With dependents, adequate life coverage ensures financial security for your family.",
      aiScore: 88,
      benefits: [
        "₹50 Lakh life cover",
        "Critical illness rider included",
        "Tax benefits under 80C",
        "Premium waiver on disability",
      ],
    })
  }

  // Critical illness recommendation
  if (userAge > 35) {
    recommendations.push({
      id: "rec-critical-1",
      type: "health",
      name: "Critical Illness Shield",
      coverage: 2500000,
      premium: 8000,
      reason: "Age-appropriate coverage for critical illnesses like cancer, heart attack, and stroke.",
      aiScore: 85,
      benefits: [
        "Covers 36 critical illnesses",
        "Lump sum payout on diagnosis",
        "No medical tests up to 40 years",
        "Worldwide coverage",
      ],
    })
  }

  return recommendations
}

export function calculateAIQuote(
  type: string,
  coverage: number,
  age: number,
  additionalFactors: Record<string, any>,
): number {
  let basePremium = coverage * 0.015

  // Age factor
  if (age > 45) basePremium *= 1.5
  else if (age > 35) basePremium *= 1.2

  // Type factor
  switch (type) {
    case "health":
      basePremium *= 1.1
      break
    case "life":
      basePremium *= 0.9
      break
    case "vehicle":
      basePremium *= 0.8
      break
  }

  // Add some randomness for demo
  basePremium *= 0.9 + Math.random() * 0.2

  return Math.round(basePremium / 100) * 100
}
