import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import 'notyf/notyf.min.css';
import App from './views/App';
import registerServiceWorker from './utils/registerServiceWorker';

const app = new App({
  button: document.querySelector('#nav-toggle'),
  drawer: document.querySelector('#nav'),
  content: document.querySelector('#content'),
});

registerServiceWorker();

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
