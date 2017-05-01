import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ToDo.css';

import { Header } from '../../components/page-elements/Header';
import { CategoryAssignList } from '../../components/items/CategoryAssignList';
import { ToDoForm } from '../../components/items/ToDoForm';
import { TwoRows } from '../../components/layouts/TwoRows';

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
    };

    this.state = {
      task: this.getTask(),
    };
  }

  getTask() {
    const { tasks, match: { params } } = this.props;
    return PagesActions.findById(params.taskId, tasks);
  }

  assign(category) {
    this.setState({
      task: Actions.setCategory(category, this.state.task),
    });
  }

  cancel() {
    this.goToList();
  }

  confirm(newFields) {
    this.setNewTasks(newFields);
    this.goToList();
  }

  setNewTasks(newFields) {
    const { setTasks, tasks } = this.props;
    setTasks(
      Actions.modifyTask(tasks, this.state.task, newFields)
    );
  }

  goToList() {
    this.props.history.goBack();
  }

  createCategoryList() {
    const { categories } = this.props;
    const assigned = PagesActions.findById(this.state.task.categoryId, categories);

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
        item={ this.state.task }
        actions={ this.formActions }/>
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
