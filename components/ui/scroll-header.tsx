"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { useAuthStore } from "@/lib/store/auth-store"
import { User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScrollHeaderProps {
  onMenuClick?: () => void
}

export function ScrollHeader({ onMenuClick }: ScrollHeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { user } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border/40 bg-background/95 px-4 shadow-sm backdrop-blur-sm transition-transform duration-300 supports-[backdrop-filter]:bg-background/80 lg:left-64 lg:w-[calc(100%-16rem)] lg:px-6",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      {onMenuClick && (
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden items-center gap-2 rounded-lg bg-primary/5 px-3 py-1.5 sm:flex">
            <User className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        )}
        <LocaleSwitcher />
      </div>
    </div>
  )
}
