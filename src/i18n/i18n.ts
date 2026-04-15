import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import es from './locales/es';
import pt from './locales/pt';
import fr from './locales/fr';
import de from './locales/de';
import it from './locales/it';
import ja from './locales/ja';
import zh from './locales/zh';
import ru from './locales/ru';
import nl from './locales/nl';
import sv from './locales/sv';
import pl from './locales/pl';
import hu from './locales/hu';
import ro from './locales/ro';
import cs from './locales/cs';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      ja: { translation: ja },
      zh: { translation: zh },
      ru: { translation: ru },
      nl: { translation: nl },
      sv: { translation: sv },
      pl: { translation: pl },
      hu: { translation: hu },
      ro: { translation: ro },
      cs: { translation: cs },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
