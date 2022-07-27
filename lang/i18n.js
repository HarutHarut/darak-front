import am from './am';
import en from './en';
import ru from './ru';
import fr from './fr';
import ch from './ch';
import de from './de';
import sp from './sp';

export default {
    locales: ["am", "en", "ru","fr", "ch", "de","sp"],
    defaultLocale: "en",
    vueI18n: {
        fallbackLocale: "en",
        messages: {
            fr: {
                ...fr
            },
            am: {
                ...am
            },
            ru: {
                ...ru
            },
            ch: {
                ...ch
            },
            de: {
                ...de
            },
            sp: {
                ...sp
            },
            en: {
                ...en
            }
        }
    }
};
