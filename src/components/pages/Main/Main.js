import React, { PureComponent, PropTypes } from 'react';
import './Main.css';

import actions from './actions.js';
const { completedPercentage } = actions;

import Header from '../../page-elements/Header/Header.js';
import ProgressBar from '../../page-elements/ProgressBar/ProgressBar.js';
import CategoryList from '../../items/CategoryList/CategoryList.js';
import TodoList from '../../items/TodoList/TodoList.js';
import TwoRows from '../../layouts/TwoRows/TwoRows.js';

class Main extends PureComponent {
  createCategoryList() {
    const { categories, category, setCategories: set, selectCategory: select } = this.props;
    return (
      <CategoryList
        categories={ categories }
        active={ category }
        actions={ { set, select } }/>
    );
  }

  createTodoList() {
    const { tasks, category, setTasks: set } = this.props;
    return (
      <TodoList
        tasks={ tasks }
        activeCategory={ category }
        filter={ { search: '', onlyDone: false } }
        actions={ { set } }/>
    );
  }

  render() {
    return (
      <div className="Main page">
        <div className="page__section-static">
          <Header text="To-Do List"/>
          <ProgressBar complete={ completedPercentage(this.props.tasks)}/>
        </div>
        <TwoRows
          className="page__section-flexible"
          left={ this.createCategoryList() }
          right={ this.createTodoList() }/>
      </div>
    );
  }
}


Main.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,

  setCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default Main;
