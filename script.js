// Language switcher functionality
const langSkButton = document.getElementById('lang-sk');
const langEnButton = document.getElementById('lang-en');

const translations = {
    sk: {
        heroTitle: 'Vitajte v našej developerskej firme',
        heroSubtitle: 'Vytvárame budúcnosť s kvalitou a inováciami.',
        contactUs: 'Kontaktujte nás',
        aboutTitle: 'O nás',
        aboutText: 'Sme profesionálna developerská firma zameraná na kvalitu, transparentnosť a inovácie.',
        contactTitle: 'Kontakt',
        name: 'Meno',
        email: 'Email',
        message: 'Správa',
        send: 'Odoslať'
    },
    en: {
        heroTitle: 'Welcome to our development company',
        heroSubtitle: 'We create the future with quality and innovation.',
        contactUs: 'Contact Us',
        aboutTitle: 'About Us',
        aboutText: 'We are a professional development company focused on quality, transparency, and innovation.',
        contactTitle: 'Contact',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send'
    }
};

function switchLanguage(lang) {
    document.querySelector('#hero h1').textContent = translations[lang].heroTitle;
    document.querySelector('#hero p').textContent = translations[lang].heroSubtitle;
    document.querySelector('#hero button').textContent = translations[lang].contactUs;
    document.querySelector('#about h2').textContent = translations[lang].aboutTitle;
    document.querySelector('#about p').textContent = translations[lang].aboutText;
    document.querySelector('#contact h2').textContent = translations[lang].contactTitle;
    document.querySelector('label[for="name"]').textContent = translations[lang].name;
    document.querySelector('label[for="email"]').textContent = translations[lang].email;
    document.querySelector('label[for="message"]').textContent = translations[lang].message;
    document.querySelector('form button').textContent = translations[lang].send;
}

langSkButton.addEventListener('click', () => switchLanguage('sk'));
langEnButton.addEventListener('click', () => switchLanguage('en'));