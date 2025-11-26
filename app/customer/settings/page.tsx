"use client"

import { useState } from "react"
import { CustomerLayout } from "@/components/layouts/customer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Bell,
    Mail,
    Shield,
    Globe,
    Moon,
    Sun,
    Smartphone,
    Lock,
    Eye,
    Download,
    Trash2,
    Check,
} from "lucide-react"

export default function SettingsPage() {
    const { toast } = useToast()
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [smsNotifications, setSmsNotifications] = useState(true)
    const [pushNotifications, setPushNotifications] = useState(false)
    const [claimUpdates, setClaimUpdates] = useState(true)
    const [renewalReminders, setRenewalReminders] = useState(true)
    const [promotionalEmails, setPromotionalEmails] = useState(false)
    const [twoFactorAuth, setTwoFactorAuth] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const [language, setLanguage] = useState("en")
    const [currency, setCurrency] = useState("inr")

    const handleSave = () => {
        toast({
            title: "Settings Saved",
            description: "Your preferences have been updated successfully.",
        })
    }

    return (
        <CustomerLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and settings</p>
                </div>

                {/* Notifications */}
                <Card className="shadow-lg rounded-3xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notification Preferences
                        </CardTitle>
                        <CardDescription>
                            Choose how you want to receive updates and notifications
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Email Notifications */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-blue-100 p-2">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <Label htmlFor="email-notif" className="font-semibold">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive updates via email
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="email-notif"
                                checked={emailNotifications}
                                onCheckedChange={setEmailNotifications}
                            />
                        </div>

                        {/* SMS Notifications */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-2">
                                    <Smartphone className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <Label htmlFor="sms-notif" className="font-semibold">
                                        SMS Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get text message alerts
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="sms-notif"
                                checked={smsNotifications}
                                onCheckedChange={setSmsNotifications}
                            />
                        </div>

                        {/* Push Notifications */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-purple-100 p-2">
                                    <Bell className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <Label htmlFor="push-notif" className="font-semibold">
                                        Push Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Browser and mobile app notifications
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="push-notif"
                                checked={pushNotifications}
                                onCheckedChange={setPushNotifications}
                            />
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-semibold mb-4">Notification Types</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="claim-updates" className="font-normal">
                                        Claim Status Updates
                                    </Label>
                                    <Switch
                                        id="claim-updates"
                                        checked={claimUpdates}
                                        onCheckedChange={setClaimUpdates}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="renewal-reminders" className="font-normal">
                                        Renewal Reminders
                                    </Label>
                                    <Switch
                                        id="renewal-reminders"
                                        checked={renewalReminders}
                                        onCheckedChange={setRenewalReminders}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="promotional" className="font-normal">
                                        Promotional Emails & Offers
                                    </Label>
                                    <Switch
                                        id="promotional"
                                        checked={promotionalEmails}
                                        onCheckedChange={setPromotionalEmails}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Security & Privacy */}
                <Card className="shadow-lg rounded-3xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security & Privacy
                        </CardTitle>
                        <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-green-100 p-2">
                                    <Lock className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <Label htmlFor="2fa" className="font-semibold">
                                        Two-Factor Authentication
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Add an extra layer of security
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="2fa"
                                checked={twoFactorAuth}
                                onCheckedChange={setTwoFactorAuth}
                            />
                        </div>

                        <div className="border-t pt-4 space-y-3">
                            <Button variant="outline" className="w-full justify-start rounded-xl">
                                <Lock className="h-4 w-4 mr-2" />
                                Change Password
                            </Button>
                            <Button variant="outline" className="w-full justify-start rounded-xl">
                                <Eye className="h-4 w-4 mr-2" />
                                Manage Active Sessions
                            </Button>
                            <Button variant="outline" className="w-full justify-start rounded-xl">
                                <Download className="h-4 w-4 mr-2" />
                                Download My Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance & Language */}
                <Card className="shadow-lg rounded-3xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Appearance & Language
                        </CardTitle>
                        <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-slate-100 p-2">
                                    {darkMode ? (
                                        <Moon className="h-5 w-5 text-slate-600" />
                                    ) : (
                                        <Sun className="h-5 w-5 text-slate-600" />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="dark-mode" className="font-semibold">
                                        Dark Mode
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Use dark theme across the app
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="dark-mode"
                                checked={darkMode}
                                onCheckedChange={setDarkMode}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger id="language" className="rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select value={currency} onValueChange={setCurrency}>
                                <SelectTrigger id="currency" className="rounded-xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inr">₹ Indian Rupee (INR)</SelectItem>
                                    <SelectItem value="usd">$ US Dollar (USD)</SelectItem>
                                    <SelectItem value="eur">€ Euro (EUR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="shadow-lg rounded-3xl border-2 border-red-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-5 w-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription>Irreversible actions - proceed with caution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start rounded-xl text-red-600 border-red-300">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete All My Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start rounded-xl text-red-600 border-red-300">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Close My Account
                        </Button>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end gap-3">
                    <Button variant="outline" className="rounded-xl">
                        Reset to Default
                    </Button>
                    <Button onClick={handleSave} className="rounded-xl gap-2">
                        <Check className="h-4 w-4" />
                        Save All Changes
                    </Button>
                </div>
            </div>
        </CustomerLayout>
    )
}
