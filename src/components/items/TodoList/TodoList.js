import React, { PureComponent, PropTypes } from 'react';
import './TodoList.css';

import ItemList from '../ItemList/ItemList.js';
import ToDo from '../ToDo/Todo.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

import actions from './actions';
const { filtered } = actions;

const emptyList = [];

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.add = () => ({});
  }

  getList() {
    const {
      filter: { search, onlyDone },
      activeCategory,
    } = this.props;

    const { id: categoryId } = activeCategory || {}; // for some reason babel doesn't allow default values in destructuring

    if (!categoryId) {
      return emptyList;
    }

    const filter = { search, onlyDone, categoryId };
    return filtered(filter, this.props.tasks);
  }

  render() {
    return <div className="TodoList">
      <ActionInput
        className="TodoList__input"
        placeholder="Enter title"
        actionTitle="Add"
        onAct={ this.add }/>
      <ItemList
        className="TodoList__list"
        list={ this.getList() }
        Element={ ToDo }
        keyPath="id"/>
    </div>;
  }
}

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeCategory: PropTypes.object,
  filter: PropTypes.shape({
    search: PropTypes.string,
    onlyDone: PropTypes.bool,
  })
    .isRequired,
  actions: PropTypes.shape({
    set: PropTypes.func.isRequired,
  })
    .isRequired,
};

export default TodoList;
