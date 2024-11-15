export const i18n = {
  defaultLocale: "en",
  locales: ["en", "sa", "hi", "mr", "gu"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
