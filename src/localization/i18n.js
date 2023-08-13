import { I18n } from 'i18n-js';

import en from "./locales/en.json";
import tr from "./locales/tr.json";

const i18n = new I18n({
    en: en,
    tr: tr,
});

i18n.defaultLocale = "en";
i18n.enableFallback = true;

export default i18n;
