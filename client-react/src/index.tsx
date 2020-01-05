import 'bootstrap/dist/css/bootstrap.min.css';
import 'reflect-metadata';
import Container from 'typedi';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';

import './index.css';
import App from './components/App';
import { POKEMON_SERVICE_BASE_URL, POKEMON_ICON_BASE_URL } from './env.constants';

configure();

const Root = () => (
  <AlertProvider template={AlertTemplate}>
    <App />
  </AlertProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

function configure() {
  Container.set(POKEMON_SERVICE_BASE_URL, 'http://34.69.246.74');
  Container.set(POKEMON_ICON_BASE_URL, 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon');
}