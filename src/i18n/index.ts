import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./locales/en";
import es from "./locales/es";
import pt from "./locales/pt";

const resources = {
  en: { translation: en },
  es: { translation: es },
  pt: { translation: pt },
};

const deviceLanguage = getLocales()[0]?.languageCode || "en";

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
