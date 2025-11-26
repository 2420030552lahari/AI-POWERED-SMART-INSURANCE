"use client"

import { AgentLayout } from "@/components/layouts/agent-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle, FileText } from "lucide-react"

export default function AgentSupportPage() {
  return (
    <AgentLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Agent Support</h1>
          <p className="text-muted-foreground">Get help and resources for your sales</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Agent Helpline</p>
                <p className="text-sm text-muted-foreground">1800-AGT-HELP</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">agents@smartinsurance.com</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Live Chat</p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Resources</CardTitle>
            <CardDescription>Essential documents and guides for agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <FileText className="h-4 w-4" />
              Product Brochures
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <FileText className="h-4 w-4" />
              Commission Structure
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <FileText className="h-4 w-4" />
              Sales Training Materials
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
              <FileText className="h-4 w-4" />
              Policy Terms & Conditions
            </Button>
          </CardContent>
        </Card>
      </div>
    </AgentLayout>
  )
}
