import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ToDo.css';

import { Header } from '../../page-elements/Header';
import { CategoryAssignList } from '../../items/CategoryAssignList';
import { ToDoForm } from '../../items/ToDoForm';
import { TwoRows } from '../../layouts/TwoRows';

import * as Actions from './actions';
import * as PagesActions from '../actions';

export class ToDoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.categoriesActions = {
      assign: this.assign.bind(this),
    };

    this.formActions = {
      cancel: this.cancel.bind(this),
      confirm: this.confirm.bind(this),
    }
  }

  initTask() {
    const { tasks, match: { params } } = this.props;
    this.task = PagesActions.findById(params.taskId, tasks);
  }

  assign(category) {
    this.modifyTask({ categoryId: category.id });
  }

  cancel() {
    this.goToList();
  }

  confirm(newFields) {
    this.modifyTask(newFields);
    this.goToList();
  }

  modifyTask(newFields) {
    const { setTasks, tasks } = this.props;
    setTasks(
      Actions.modifyTask(tasks, this.task, newFields)
    );
  }

  goToList() {
    this.props.history.goBack();
  }

  createCategoryList() {
    const { categories } = this.props;
    const assigned = PagesActions.findById(this.task.categoryId, categories);

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
        item={ this.task }
        actions={ this.formActions }/>
    );
  }

  render() {
    this.initTask();

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
  setTasks: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      taskId: PropTypes.string.isRequired,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
