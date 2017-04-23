import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ToDo.css';

import { Header } from '../../page-elements/Header';
import { CategoryAssignList } from '../../items/CategoryAssignList';
import { ToDoForm } from '../../items/ToDoForm';
import { TwoRows } from '../../layouts/TwoRows';

import * as actions from './actions';

export class ToDoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.categoriesActions = {
      assign: this.assign.bind(this),
    };
  }

  assign(item) {
    console.log('Assign category ', item.title, ' to task ', this.props.match.params.taskId)
  }

  createCategoryList(task) {
    const { categories } = this.props;
    const assigned = actions.findById(task.categoryId, categories);

    return (
      <CategoryAssignList
        categories={ categories }
        assigned={ assigned }
        actions={ this.categoriesActions }/>
    );
  }

  createTaskForm(task) {
    return (
      <ToDoForm
        item={ task }/>
    );
  }

  render() {
    const { tasks, match: { params } } = this.props;
    const task = actions.findById(params.taskId, tasks);

    return (
      <div className="page-ToDo page">
        <div className="page__section-static">
          <Header text="To-Do List"/>
        </div>
        <TwoRows
          className="page__section-flexible"
          left={ this.createCategoryList(task) }
          right={ this.createTaskForm(task) }/>
      </div>
    );
  }
}

ToDoPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      taskId: PropTypes.string.isRequired,
    }),
  }),
};
