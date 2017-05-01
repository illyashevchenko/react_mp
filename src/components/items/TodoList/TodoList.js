import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

import { ItemList } from '../ItemList';
import { ToDo } from '../ToDo';
import { ActionInput } from '../../controls/ActionInput';

import Actions from './actions';

const emptyList = [];

export class TodoList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.taskActions = {
      toggle: this.toggleDone.bind(this),
      edit: props.actions.select,
    };
  }

  add(title) {
    if (!title) {
      return;
    }

    const { actions: { set }, categoryId, tasks } = this.props;
    const toDo = Actions.create(title, categoryId);

    set([toDo, ...tasks]);
  }

  toggleDone(item) {
    const { actions: { set }, tasks } = this.props;

    set(Actions.toggleDone(item, tasks));
  }

  getList() {
    const {
      filter: { search, onlyDone },
      categoryId,
      tasks,
    } = this.props;

    if (!categoryId) {
      return emptyList;
    }

    const filter = { search, onlyDone, categoryId };
    return Actions.filtered(filter, tasks);
  }

  render() {
    return this.props.categoryId
      ? (
        <div className="TodoList">
          <ActionInput
            className="TodoList__input"
            placeholder="Enter title"
            actionTitle="Add"
            onAct={ this.add }/>
          <ItemList
            className="TodoList__list"
            list={ this.getList() }
            actions={ this.taskActions }
            Element={ ToDo }
            keyPath="id"/>
        </div>
      )
      : <div>There is no active category. Please select one</div>;
  }
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryId: PropTypes.number,
  filter: PropTypes.shape({
    search: PropTypes.string,
    onlyDone: PropTypes.bool,
  })
    .isRequired,
  actions: PropTypes.shape({
    set: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  })
    .isRequired,
};
