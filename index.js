import routes from './routes.js';

const stringToChange = document.getElementById('stringToChange');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', () => {
    if (stringToChange.value === '')
        alert('É preciso digitar uma frase!!');
    else{
        localStorage.setItem('stringHash', stringToChange.value);
        location.reload();
    }
});

const container = document.querySelector('#root');

const init = () => window.addEventListener('hashchange', renderPage);
const validateHash = (hash) => hash === '' ? 'home' : hash.replace('#', '');

const renderPage = () => {
    const page = validateHash(window.location.hash);
    container.innerHTML = '';
    container.appendChild(routes[page]);
};

window.addEventListener('load', () => {
    renderPage();
    init();
});