import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Main.css';

import actions from './actions';

import { Header } from '../../page-elements/Header';
import { ProgressBar } from '../../page-elements/ProgressBar';
import { ToDoFilter } from '../../page-elements/ToDoFilter';
import { CategoryList } from '../../items/CategoryList';
import { TodoList } from '../../items/TodoList';
import { TwoRows } from '../../layouts/TwoRows';

export class MainPage extends PureComponent {
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

    const toRemove = actions.idsToRemove(category.id, categories);

    const cleanedCategories = actions.removeByIds(toRemove, categories);
    const newCategories = actions.removeFromParent(category.id, cleanedCategories);

    const newTasks = actions.removeCategoriesTasks(toRemove, tasks);

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
      <div className="page-Main page">
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


MainPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,

  setCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
};
