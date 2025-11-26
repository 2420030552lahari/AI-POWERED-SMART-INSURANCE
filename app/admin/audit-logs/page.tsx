"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search } from "lucide-react"
import { mockAuditLogs } from "@/lib/api/mock-data/admin"

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLogs = mockAuditLogs.filter(
    (log) =>
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getActionColor = (action: string) => {
    if (action.includes("approved")) return "bg-success/10 text-success"
    if (action.includes("rejected")) return "bg-destructive/10 text-destructive"
    if (action.includes("created")) return "bg-info/10 text-info"
    return "bg-primary/10 text-primary"
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">Track all system activities and user actions</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filteredLogs.map((log) => (
            <Card key={log.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{log.userName}</h3>
                      <Badge variant="outline" className={getActionColor(log.action)}>
                        {log.action.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm">{log.details}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{log.timestamp}</span>
                      <span>•</span>
                      <span>IP: {log.ipAddress}</span>
                      <span>•</span>
                      <span>User ID: {log.userId}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
