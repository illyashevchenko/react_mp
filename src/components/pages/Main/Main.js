import React, { PureComponent } from 'react';
import './Main.css';

import Header from '../../page-elements/Header/Header.js';

class Main extends PureComponent {
  render() {
    return (
      <div className="Main">
        <Header text="TO-Do List"/>
      </div>
    );
  }
}

export default Main;
