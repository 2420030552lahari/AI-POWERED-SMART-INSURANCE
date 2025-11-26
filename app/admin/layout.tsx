import type React from "react"
import { AIChatbot } from "@/components/ai/ai-chatbot"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <AIChatbot />
    </>
  )
}
