import type React from "react"
import { AIChatbot } from "@/components/ai/ai-chatbot"

export default function AgentRootLayout({
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
