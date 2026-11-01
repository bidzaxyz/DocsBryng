// Mintlify does not offer a native Georgian UI locale. Keep content language
// correct for assistive technology, including after client-side navigation.
function setBryngDocsLanguage() {
  document.documentElement.lang = (location.pathname === '/ka' || location.pathname.startsWith('/ka/')) ? 'ka' : 'en';
}
setBryngDocsLanguage();
window.addEventListener('mintlify:navigate', setBryngDocsLanguage);
