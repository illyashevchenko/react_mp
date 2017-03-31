import React, { PureComponent } from 'react';
import './Main.css';

import Header from '../../page-elements/Header/Header.js';
import ProgressBar from '../../page-elements/ProgressBar/ProgressBar.js';
import ItemsList from '../../items/ItemsList/ItemsList.js';
import TwoRows from '../../layouts/TwoRows/TwoRows.js';

class Main extends PureComponent {
  render() {
    return (
      <div className="Main">
        <Header text="TO-Do List"/>
        <ProgressBar />
        <TwoRows left={ <ItemsList /> } right={ <ItemsList /> }/>
      </div>
    );
  }
}

export default Main;
