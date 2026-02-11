import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // Navigation
            "nav.home": "Home",
            "nav.about": "About",
            "nav.sermons": "Sermons",
            "nav.blog": "Blog",
            "nav.contact": "Contact",

            // Home Page
            "home.welcome": "Welcome to",
            "home.subtitle": "Join us in worship and fellowship",
            "home.cta": "Visit Us",
            "home.latest_sermons": "Latest Sermons",
            "home.recent_blogs": "Recent Blog Posts",

            // Sermons
            "sermons.title": "Sermons",
            "sermons.speaker": "Speaker",
            "sermons.date": "Date",
            "sermons.series": "Series",
            "sermons.watch": "Watch Sermon",

            // Blog
            "blog.title": "Blog",
            "blog.read_more": "Read More",
            "blog.by": "By",
            "blog.tags": "Tags",

            // Contact
            "contact.title": "Contact Us",
            "contact.name": "Name",
            "contact.email": "Email",
            "contact.message": "Message",
            "contact.send": "Send Message",

            // Common
            "common.loading": "Loading...",
            "common.search": "Search",
            "common.filter": "Filter",
            "common.all": "All"
        }
    },
    hi: {
        translation: {
            // Navigation
            "nav.home": "होम",
            "nav.about": "हमारे बारे में",
            "nav.sermons": "उपदेश",
            "nav.blog": "ब्लॉग",
            "nav.contact": "संपर्क करें",

            // Home Page
            "home.welcome": "में आपका स्वागत है",
            "home.subtitle": "पूजा और संगति में हमारे साथ शामिल हों",
            "home.cta": "हमसे मिलें",
            "home.latest_sermons": "नवीनतम उपदेश",
            "home.recent_blogs": "हाल के ब्लॉग पोस्ट",

            // Sermons
            "sermons.title": "उपदेश",
            "sermons.speaker": "वक्ता",
            "sermons.date": "तारीख",
            "sermons.series": "श्रृंखला",
            "sermons.watch": "उपदेश देखें",

            // Blog
            "blog.title": "ब्लॉग",
            "blog.read_more": "और पढ़ें",
            "blog.by": "द्वारा",
            "blog.tags": "टैग",

            // Contact
            "contact.title": "संपर्क करें",
            "contact.name": "नाम",
            "contact.email": "ईमेल",
            "contact.message": "संदेश",
            "contact.send": "संदेश भेजें",

            // Common
            "common.loading": "लोड हो रहा है...",
            "common.search": "खोजें",
            "common.filter": "फ़िल्टर",
            "common.all": "सभी"
        }
    },
    es: {
        translation: {
            // Navigation
            "nav.home": "Inicio",
            "nav.about": "Acerca de",
            "nav.sermons": "Sermones",
            "nav.blog": "Blog",
            "nav.contact": "Contacto",

            // Home Page
            "home.welcome": "Bienvenido a",
            "home.subtitle": "Únete a nosotros en adoración y comunión",
            "home.cta": "Visítanos",
            "home.latest_sermons": "Últimos Sermones",
            "home.recent_blogs": "Publicaciones Recientes",

            // Sermons
            "sermons.title": "Sermones",
            "sermons.speaker": "Orador",
            "sermons.date": "Fecha",
            "sermons.series": "Serie",
            "sermons.watch": "Ver Sermón",

            // Blog
            "blog.title": "Blog",
            "blog.read_more": "Leer Más",
            "blog.by": "Por",
            "blog.tags": "Etiquetas",

            // Contact
            "contact.title": "Contáctanos",
            "contact.name": "Nombre",
            "contact.email": "Correo Electrónico",
            "contact.message": "Mensaje",
            "contact.send": "Enviar Mensaje",

            // Common
            "common.loading": "Cargando...",
            "common.search": "Buscar",
            "common.filter": "Filtrar",
            "common.all": "Todos"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
