import type { LocalePrefix, Pathnames } from "next-intl/routing";

// @see i18n-ally.localesPaths in settings.json
export const i18nTheme = "default" as "default" | "ecommerce";

// @see matcher in middleware.ts
export const locales = ["en", "sa", "hi", "mr", "gu"] as const;

export const localePrefix: LocalePrefix<typeof locales> = "always";

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/donate": {
    en: "/donate",
    sa: "/spenden",
    hi: "/दान",
    gu: "/donar",
    mr: "/don",
  },
  "/pathnames": {
    en: "/pathnames",
    sa: "/pfadnamen",
    mr: "/نام‌های-مسیر",
    hi: "/पथनाम",
    gu: "/nomi-percorso",
  },
};

export const labels = {
  en: "English",
  gu: "Gujarati",
  sa: "Sanskrit",
  mr: "Marathi",
  hi: "Hindi",
};

export const localeFlags: {
  [key in Locale]: string;
} = {
  en: "🇬🇧",
  gu: "🇪🇸",
  sa: "🇮🇷",
  mr: "🇫🇷",
  hi: "🇮🇳",
};
