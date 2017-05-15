import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { App } from './App';
import { godReducer } from './reducers';

import { stubData } from './stub-data';

import { SvgLib } from './components/assets';
import './index.css';

import './components/assets';

const logger = createLogger();
const store = createStore(godReducer, stubData, applyMiddleware(logger));

const Container = () =>
  <Provider
    store={ store }>
    <main>
      <App />
      <SvgLib />
    </main>
  </Provider>;

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);
