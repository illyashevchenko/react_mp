import React, { PureComponent, PropTypes } from 'react';
import './Main.css';

import actions from './actions.js';

import Header from '../../page-elements/Header/Header.js';
import ProgressBar from '../../page-elements/ProgressBar/ProgressBar.js';
import ToDoFilter from '../../page-elements/ToDoFilter/ToDoFilter.js';
import CategoryList from '../../items/CategoryList/CategoryList.js';
import TodoList from '../../items/TodoList/TodoList.js';
import TwoRows from '../../layouts/TwoRows/TwoRows.js';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { filter: { search: '', onlyDone: false } };
    this.filterActions = {
      set: this.setFilter.bind(this),
    };

    const { setCategories, selectCategory, setTasks } = props;

    this.categoriesActions = {
      set: setCategories,
      select: selectCategory,
      remove: this.removeCategory.bind(this),
    };

    this.todoActions = {
      set: setTasks,
    };
  }

  removeCategory(category) {
    const { categories, tasks, setCategories, setTasks } = this.props;
    const newCategories = actions.removeCategory(categories, category);
    const newTasks = actions.removeTaskByCategory(tasks, category.id);

    setCategories(newCategories);
    setTasks(newTasks);
  }

  setFilter(filter) {
    this.setState({ filter });
  }

  createCategoryList() {
    const { categories, category } = this.props;

    return (
      <CategoryList
        categories={ categories }
        active={ category }
        actions={ this.categoriesActions }/>
    );
  }

  createTodoList() {
    const { tasks, category } = this.props;

    return (
      <TodoList
        tasks={ tasks }
        activeCategory={ category }
        filter={ this.state.filter }
        actions={ this.todoActions }/>
    );
  }

  render() {
    return (
      <div className="Main page">
        <div className="page__section-static">
          <Header text="To-Do List">
            <ToDoFilter
              filter={ this.state.filter }
              actions={ this.filterActions }/>
          </Header>
          <ProgressBar complete={ actions.completedPercentage(this.props.tasks)}/>
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
