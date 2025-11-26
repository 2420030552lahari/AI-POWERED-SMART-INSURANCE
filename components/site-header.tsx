"use client"

import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useTranslation } from "@/lib/i18n/use-translation"

export function SiteHeader() {
    const t = useTranslation()

    return (
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                        <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">Smart Insurance</span>
                </Link>
                <div className="flex items-center gap-4">
                    <LocaleSwitcher />
                    <Link href="/auth/login">
                        <Button variant="ghost">{t.common.login}</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button className="gap-2">
                            {t.common.signup}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
