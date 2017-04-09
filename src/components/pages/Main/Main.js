import React, { PureComponent, PropTypes } from 'react';
import './Main.css';

import { filter, prop } from 'ramda';

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
        filter={ { search: '', done: false } }
        actions={ { set } }/>
    );
  }

  completedList = filter(prop('done'));

  getCompleted() {
    const completed = this.completedList(this.props.tasks).length;
    const all = this.props.tasks.length;

    return Math.round(100 * completed / all);
  }

  render() {
    return (
      <div className="Main page">
        <div className="page__section-static">
          <Header text="To-Do List"/>
          <ProgressBar complete={ this.getCompleted()}/>
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
