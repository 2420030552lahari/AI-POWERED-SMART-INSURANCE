"use client"

import { useLocale } from "./locale-provider"
import { translations } from "./translations"

export function useTranslation() {
  const { locale } = useLocale()
  return translations[locale]
}
