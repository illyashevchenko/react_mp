import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import SvgLib from './components/assets/SvgLib.js';
import './index.css';

import './components/assets';

const Container = () =>
  <main>
    <App />
    <SvgLib />
  </main>;

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);
