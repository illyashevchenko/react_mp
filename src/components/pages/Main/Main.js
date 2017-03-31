import React, { PureComponent } from 'react';
import './Main.css';

import Header from '../../page-elements/Header/Header.js';
import ProgressBar from '../../page-elements/ProgressBar/ProgressBar.js';
import CategoryList from '../../items/CategoryList/CategoryList.js';
import TodoList from '../../items/TodoList/TodoList.js';
import TwoRows from '../../layouts/TwoRows/TwoRows.js';


class Main extends PureComponent {
  render() {
    return (
      <div className="Main">
        <Header text="To-Do List"/>
        <ProgressBar complete="15"/>
        <TwoRows left={ <CategoryList /> }
                 right={ <TodoList /> }/>
      </div>
    );
  }
}

export default Main;
