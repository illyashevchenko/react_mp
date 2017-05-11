import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Ramda from 'ramda';

import './ToDo.css';

import { Header } from '../../components/page-elements/Header';
import { CategoryAssignList } from '../../components/items/CategoryAssignList';
import { ToDoForm } from '../../components/items/ToDoForm';
import { TwoRows } from '../../components/layouts/TwoRows';

import * as PagesActions from '../actions';

const { pick, merge } = Ramda;
const pickProps = pick(['title', 'done', 'description', 'categoryId']);

export class ToDoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.categoriesActions = {
      assign: this.assign.bind(this),
    };

    this.formActions = {
      cancel: this.cancel.bind(this),
      confirm: this.confirm.bind(this),
      update: this.updateValues.bind(this),
    };

    const task = this.getTask();
    this.state = {
      task,
      values: pickProps(task),
    };
  }

  getTask() {
    const { tasks, match: { params } } = this.props;
    return PagesActions.findById(params.taskId, tasks);
  }

  assign(category) {
    this.updateValues({ categoryId: category.id });
  }

  cancel() {
    this.goToList();
  }

  confirm() {
    const { modifyTask } = this.props.actions;
    const { task, values } = this.state;

    modifyTask(task, values);

    this.goToList();
  }

  goToList() {
    this.props.history.goBack();
  }

  updateValues(values) {
    this.setState({
      values: merge(this.state.values, values),
    })
  }

  createCategoryList() {
    const { categories } = this.props;
    const { categoryId } = this.state.values;

    const assigned = PagesActions.findById(categoryId, categories);

    return (
      <CategoryAssignList
        categories={ categories }
        assigned={ assigned }
        actions={ this.categoriesActions }/>
    );
  }

  createTaskForm() {
    return (
      <ToDoForm
        actions={ this.formActions }
        values={ this.state.values }/>
    );
  }

  render() {
    return (
      <div className="page-ToDo page">
        <div className="page__section-static">
          <Header text="To-Do List"/>
        </div>
        <TwoRows
          className="page__section-flexible"
          left={ this.createCategoryList() }
          right={ this.createTaskForm() }/>
      </div>
    );
  }
}

ToDoPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    modifyTask: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      taskId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
