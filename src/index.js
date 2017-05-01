import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './App';
import { godReducer } from './reducers';

import { stubData } from './stub-data';

import SvgLib from './components/assets/SvgLib';
import './index.css';

import './components/assets';

const store = createStore(godReducer, stubData);

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
