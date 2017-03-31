import React, { PureComponent } from 'react';
import './TodoList.css';

import ItemsList from '../ItemsList/ItemsList.js';

class TodoList extends PureComponent {
  render() {
    return <div className="TodoList">
      TodoList:
      <ItemsList/>
    </div>;
  }
}

export default TodoList;
