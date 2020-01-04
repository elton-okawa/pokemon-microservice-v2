import 'reflect-metadata';
import Container from 'typedi';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/App';
import { POKEMON_SERVICE_BASE_URL } from './env.constants';

configure();
ReactDOM.render(<App />, document.getElementById('root'));

function configure() {
  Container.set(POKEMON_SERVICE_BASE_URL, 'http://34.69.246.74');
}