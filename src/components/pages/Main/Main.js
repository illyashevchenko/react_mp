import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import QueryString from 'query-string';

import './Main.css';

import * as Actions from './actions';
import * as PageActions from '../actions';

import { Header } from '../../page-elements/Header';
import { ProgressBar } from '../../page-elements/ProgressBar';
import { ToDoFilter } from '../../page-elements/ToDoFilter';
import { CategorySelectList } from '../../items/CategorySelectList';
import { TodoList } from '../../items/TodoList';
import { TwoRows } from '../../layouts/TwoRows';

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
    this.props.selectCategory(category);
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

    this.handleActiveCategoryDeleted(category);
  }

  handleActiveCategoryDeleted(removedCategory) {
    const { selectCategory, category } = this.props;

    if (removedCategory === category) {
      selectCategory(null);
    }
  }

  componentDidMount() {
    this.selectCategoryFromLocation();

  }

  selectCategoryFromLocation() {
    const { location: { search }, selectCategory, categories } = this.props;
    const categoryId = QueryString.parse(search).categoryId;
    const category = PageActions.findById(categoryId, categories);

    if (category) {
      selectCategory(category);
    }
  }

  createCategoryList() {
    const { categories, category } = this.props;

    return (
      <CategorySelectList
        categories={ categories }
        active={ category }
        actions={ this.categoriesActions }/>
    );
  }

  createTodoList(filter) {
    const { tasks, category } = this.props;

    return (
      <TodoList
        tasks={ tasks }
        activeCategory={ category }
        filter={ filter }
        actions={ this.todoActions }/>
    );
  }

  selectToDo(item) {
    this.props.history.push({
      pathname: `/edit/${ item.id }`,
    });
  }

  getFilterFromLocation() {
    const { location } = this.props;
    const filter = QueryString.parse(location.search);

    return {
      search: '',
      ...filter,
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
          left={ this.createCategoryList() }
          right={ this.createTodoList(filter) }/>
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
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
