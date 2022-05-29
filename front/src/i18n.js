import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import plMessages from './i18n/pl.json';
import enMessages from './i18n/en.json';
import deMessages from './i18n/de.json';
import { getLanguage } from "./services/UserDataService";

const resources = {
  en: {
    translation: enMessages
  },
  pl: {
    translation: plMessages
  },
  de: {
    translation: deMessages
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguage(),
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;