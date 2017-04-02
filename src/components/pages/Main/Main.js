import React, { PureComponent, PropTypes } from 'react';
import './Main.css';

import Header from '../../page-elements/Header/Header.js';
import ProgressBar from '../../page-elements/ProgressBar/ProgressBar.js';
import CategoryList from '../../items/CategoryList/CategoryList.js';
import TodoList from '../../items/TodoList/TodoList.js';
import TwoRows from '../../layouts/TwoRows/TwoRows.js';


class Main extends PureComponent {
  createCategoryList() {
    return (
      <CategoryList
        categories={ this.props.categories }
        actions={{
          set: this.props.setCategories,
          select: this.props.selectCategory,
        }}/>
    );
  }

  createTodoList() {
    return (
      <TodoList
        tasks={ this.props.tasks }
        activeCategory={ this.props.category }
        filter={ { search: '', done: false } }
        actions={{
          set: this.props.setTasks,
        }}/>
    );
  }

  getCompleted() {
    const completed = this.props.tasks.map((task) => task.done);
    const all = this.props.tasks.length;

    return Math.round(completed / all);
  }

  render() {
    return (
      <div className="Main">
        <Header text="To-Do List"/>
        <ProgressBar complete={ this.getCompleted()}/>
        <TwoRows
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
