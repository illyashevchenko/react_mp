import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QueryString from 'query-string';

import R from 'ramda';

import './Main.css';

import * as Categories from '../../models/categories';
import * as Tasks from '../../models/tasks';
import * as Helpers from '../../models/helpers';

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

    const { tasks, categories } = props.actions;

    this.categoriesActions = Object.assign({
      select: this.selectCategory.bind(this),
      remove: this.removeCategory.bind(this),
    }, R.omit(['remove'], categories));

    this.todoActions = Object.assign({
      select: this.selectToDo.bind(this),
    }, tasks);
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
    const { categories, actions: { categories: { remove } } } = this.props;

    const categoryId = category.id;
    const toRemoveIds = Categories.idsToRemove(categoryId, categories);

    remove(categoryId, toRemoveIds);
  }

  createCategoryList({ categoryId }) {
    const { categories } = this.props;
    const category = Helpers.findById(categoryId, categories);

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
            complete={ Tasks.completedPercentage(this.props.tasks)}/>
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
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,

  actions: PropTypes.shape({
    categories: PropTypes.shape({
      remove: PropTypes.func.isRequired,
      addNested: PropTypes.func.isRequired,
      addRoot: PropTypes.func.isRequired,
      editConfirm: PropTypes.func.isRequired,
      editCancel: PropTypes.func.isRequired,
    }),
    tasks: PropTypes.shape({
      add: PropTypes.func.isRequired,
      toggleDone: PropTypes.func.isRequired,
    }),
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
