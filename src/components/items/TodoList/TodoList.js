import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

import { ItemList } from '../ItemList';
import { ToDo } from '../ToDo';
import { ActionInput } from '../../controls/ActionInput';

import * as Actions from './actions';

const emptyList = [];

export class TodoList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.taskActions = {
      toggle: props.actions.toggleDone,
      edit: props.actions.select,
    };
  }

  add(title) {
    const { actions: { add }, filter: { categoryId } } = this.props;
    add(categoryId, title);
  }

  getList() {
    const { filter, tasks } = this.props;

    if (!filter.categoryId) {
      return emptyList;
    }

    return Actions.filtered(filter, tasks);
  }

  render() {
    const { filter: { categoryId } } = this.props;

    if (!categoryId) {
      return <div>No category selected</div>;
    }

    const list = this.getList();

    return (
      <div className="TodoList">
        <ActionInput
          className="TodoList__input"
          placeholder="Enter title"
          actionTitle="Add"
          onAct={ this.add }/>

        { list.length
          ? (
            <ItemList
              className="TodoList__list"
              list={ list }
              actions={ this.taskActions }
              Element={ ToDo }
              keyPath="id"/>
          )
          : <div>No tasks matching selected filter were found</div>
        }
      </div>
    );
  }
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.shape({
    search: PropTypes.string,
    onlyDone: PropTypes.bool,
    categoryId: PropTypes.number,
  })
    .isRequired,
  actions: PropTypes.shape({
    toggleDone: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  })
    .isRequired,
};
