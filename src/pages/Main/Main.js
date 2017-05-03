import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QueryString from 'query-string';

import './Main.css';

import * as Actions from './actions';
import * as PageActions from '../actions';

import { Header } from '../../components/page-elements/Header';
import { ProgressBar } from '../../components/page-elements/ProgressBar';
import { ToDoFilter } from '../../components/page-elements/ToDoFilter';
import { CategorySelectList } from '../../components/items/CategorySelectList';
import { TodoList } from '../../components/items/TodoList';
import { TwoRows } from '../../components/layouts/TwoRows';

export class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.filterActions = {
      set: this.setFilter.bind(this),
    };

    const { setCategories, setTasks } = props;

    this.categoriesActions = {
      set: setCategories,
      select: this.selectCategory.bind(this),
      remove: this.removeCategory.bind(this),
    };

    this.todoActions = {
      set: setTasks,
      select: this.selectToDo.bind(this),
    };
  }

  selectCategory(category) {
    this.setQueryParams({ categoryId: category.id });
  }

  setFilter(filter) {
    this.setQueryParams(filter)
  }

  setQueryParams(newParams) {
    const { history, location: { pathname, search: currentSearch } } = this.props;

    const currentParams = QueryString.parse(currentSearch);
    const search = QueryString.stringify(
      Object.assign(currentParams, newParams)
    );

    history.push({ pathname, search });
  }

  removeCategory(category) {
    const { categories, tasks, setCategories, setTasks } = this.props;

    const result = Actions.removeCategory(category, categories, tasks);

    setCategories(result.categories);
    setTasks(result.tasks);
  }

  createCategoryList({ categoryId }) {
    const { categories } = this.props;
    const category = PageActions.findById(categoryId, categories);

    return (
      <CategorySelectList
        categories={ categories }
        active={ category }
        actions={ this.categoriesActions }/>
    );
  }

  createTodoList(filter) {
    const { tasks } = this.props;

    return (
      <TodoList
        tasks={ tasks }
        filter={ filter }
        actions={ this.todoActions }/>
    );
  }

  selectToDo(item) {
    const { location, history } = this.props;

    history.push({
      pathname: `/edit/${ item.id }`,
      search: location.search,
    });
  }

  getFilterFromLocation() {
    const { location } = this.props;
    const filter = QueryString.parse(location.search);

    return {
      search: filter.search || '',
      categoryId: +filter.categoryId || null,
      onlyDone: filter.onlyDone === 'true',
    };
  }

  render() {
    const filter = this.getFilterFromLocation();

    return (
      <div className="page-Main page">
        <div className="page__section-static">
          <Header text="To-Do List">
            <ToDoFilter
              filter={ filter }
              actions={ this.filterActions }/>
          </Header>
          <ProgressBar
            complete={ Actions.completedPercentage(this.props.tasks)}/>
        </div>
        <TwoRows
          className="page__section-flexible"
          left={ this.createCategoryList(filter) }
          right={ this.createTodoList(filter) }/>
      </div>
    );
  }
}


MainPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,

  setCategories: PropTypes.func.isRequired,
  selectCategory: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
