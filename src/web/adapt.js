
// Function to load the translation JSON file based on selected language
async function loadTranslations(lang) {
    try {
        const response = await fetch(`/locales/${lang}/index.json`);
        const translations = await response.json();
        return translations;
    } catch (error) {
        console.error("Could not load translation file:", error);
        return {};
    }
}

// Function to apply translations to elements with data-i18n and data-i18n-placeholder
async function setLanguage(lang, old_lang) {

    const translations = await loadTranslations(lang);

    console.log(translations)

    // Change the language tag element in bold
    localStorage.setItem('language', lang);
    let nLink = document.querySelector('[data-lang="' + lang + '"]');
    nLink.classList.add("font-bold");
    let oldLink = document.querySelector('[data-lang="' + old_lang + '"]');
    oldLink.classList.remove("font-bold");


    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    // Update elements with data-i18n-placeholder attribute (e.g., input placeholders)
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.placeholder = translations[key];
        }
    });
}

async function changeLanguage(lang) {
    const old_lang = localStorage.getItem('language') || 'en';
    if (old_lang != lang) {
        await setLanguage(lang, old_lang);
        // const path = window.location.pathname;
        // const regex = /^\/(en)\/(.*)$/;
        // const match = path.match(regex);

        // if (match) {
        //     const newPath = `/${userPreferredLanguage}/${match[2]}`;
        //     window.location.assign(newPath);
        // }
        // const langData = await fetchLanguageData(lang);
        // updateContent(langData);
    }
}

/** Set the language when loaded */
window.addEventListener('DOMContentLoaded', async () => {
    // Set the default language on page load
    setLanguage('en', 'fr');

    const userPreferredLanguage = localStorage.getItem('language') || 'en'; //retrieves the current language
    console.log(userPreferredLanguage);
    let nLink = document.querySelector('[data-lang="' + userPreferredLanguage + '"]');
    nLink.classList.add("font-bold") //sets the new language to bold
    localStorage.setItem('language', userPreferredLanguage);

    // const langData = await fetchLanguageData(userPreferredLanguage);
    // updateContent(langData);
});

//page managment
function signUp() {
    window.location.assign("signUp.html"); //assign is better as we can go back
}

function goToMain() {
    window.location.assign("index.html");
}

// window.signUp = signUp;  