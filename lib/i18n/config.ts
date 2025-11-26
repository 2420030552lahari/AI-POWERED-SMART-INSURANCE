export const defaultLocale = "en"
export const locales = ["en", "hi"] as const
export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिंदी",
}
