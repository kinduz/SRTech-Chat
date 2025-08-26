"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  fr: {
    translation: fr,
  },
  de: {
    translation: de,
  },
};

// Проверяем, что мы на клиенте перед инициализацией
if (typeof window !== "undefined") {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      lng: "en", // Устанавливаем дефолтный язык
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });
} else {
  // На сервере используем только базовую инициализацию
  i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
