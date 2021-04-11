const REQUEST_FAILED = 'request failed';

const getPageLang = () => {
  const DEFAULT = 'en';
  const htmlNode = document.querySelector('html');
  const htmlLang = htmlNode.getAttribute('lang');
  return htmlLang?.includes('ru') ? 'ru' : DEFAULT;
};

const getSelectionText = () => window.getSelection ? window.getSelection().toString().trim() : '';

const getUrl = ({ lang = 'en', query }) => (`https://${lang}.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${query}&exintro=1&explaintext=1`);

const fetchWikiText = async (query) => {
    const params = {
        headers: {
            'Origin': `${window.location.href}`,
            'Content-Type': 'application/json; charset=UTF-8',
        }
    };
    const response = await fetch(getUrl({lang: getPageLang(), query}), params).catch(() => { throw new Error(REQUEST_FAILED)});
    return response.json();
}

document.addEventListener('keypress', async (event) => {
    const { shiftKey, code } = event;
    if (shiftKey && code === 'KeyT') {
        const query = getSelectionText();
        const response = await fetchWikiText(query);
        alert(Object.values(response.query.pages)[0].extract);
    }
});


