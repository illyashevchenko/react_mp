import React, { PureComponent } from 'react';
import './TodoList.css';

import ItemList from '../ItemList/ItemList.js';
import ToDo from '../ToDo/Todo.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

class TodoList extends PureComponent {
  constructor(props) {
    super(props);
    this.add = () => {};
  }

  render() {
    return <div className="TodoList">
      <ActionInput
        placeholder="Enter title"
        actionTitle="Add"
        onAct={ this.add }/>
      <ItemList
        list={ this.props.tasks }
        Element={ ToDo }
        keyPath="id"/>
    </div>;
  }
}

export default TodoList;
