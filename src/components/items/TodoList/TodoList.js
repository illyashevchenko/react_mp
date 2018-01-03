import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

import { ItemList } from '../ItemList';
import { ToDo } from '../ToDo';
import { ActionInput } from '../../controls/ActionInput';

export class TodoList extends PureComponent {
  constructor(props) {
    super(props);

    this.taskActions = {
      toggle: props.actions.toggleDone,
      edit: props.actions.select,
    };
  }

  render() {
    const { tasks: list, actions: { add } } = this.props;

    return (
      <div className="TodoList">
        <ActionInput
          className="TodoList__input"
          placeholder="Enter title"
          actionTitle="Add"
          onAct={ add }/>

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
  actions: PropTypes.shape({
    toggleDone: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  })
    .isRequired,
};
