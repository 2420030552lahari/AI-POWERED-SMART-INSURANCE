export interface OCRResult {
  documentType: string
  extractedData: Record<string, string>
  confidence: number
  fraudScore: number
}

export async function processClaimDocumentOCR(file: File): Promise<OCRResult> {
  // Simulate AI OCR processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const documentTypes = ["Medical Bill", "Prescription", "Discharge Summary", "Lab Report"]
  const randomType = documentTypes[Math.floor(Math.random() * documentTypes.length)]

  const extractedData: Record<string, string> = {
    "Patient Name": "Rahul Sharma",
    Hospital: "Apollo Hospital",
    "Bill Amount": "₹45,000",
    Date: new Date().toLocaleDateString("en-IN"),
    Treatment: "Medical Consultation & Tests",
    Doctor: "Dr. Priya Patel",
  }

  const confidence = 0.85 + Math.random() * 0.15
  const fraudScore = Math.random() * 100

  return {
    documentType: randomType,
    extractedData,
    confidence,
    fraudScore,
  }
}

export function getFraudRiskLevel(score: number): "low" | "medium" | "high" {
  if (score < 30) return "low"
  if (score < 70) return "medium"
  return "high"
}

export function getFraudRiskColor(level: "low" | "medium" | "high"): string {
  switch (level) {
    case "low":
      return "text-success"
    case "medium":
      return "text-warning"
    case "high":
      return "text-destructive"
  }
}
