import { h, render } from 'preact';
import 'preact/devtools';
import App from './App.js';
import { i18nInit } from './i18n';

const root = document.getElementById('root');

if (root) {
  i18nInit.then(() => render(<App />, root));
}
