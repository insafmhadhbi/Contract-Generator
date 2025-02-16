import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAR from "./locales/ar/translation.json";
import translationFR from "./locales/fr/translation.json";

// the translations
const resources = {
  ar: {
    translation: translationAR,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",

    keySeparator: ":", // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
