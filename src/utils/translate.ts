import { translations } from "../i18n/translations";
import type { Language } from "../i18n/translations";

export const getTranslation = (key: string, language: Language): string => {
  const keys = key.split(".");
  let value: Record<string, unknown> = translations[language];
  for (const k of keys) {
    value = value[k] as Record<string, unknown>;
  }
  return (value as unknown as string) || key;
}; 