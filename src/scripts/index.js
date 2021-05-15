import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import App from './views/App';

const app = new App({
  button: document.querySelector('#nav-toggle'),
  drawer: document.querySelector('#nav'),
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
