import React, { PureComponent } from 'react';
import './CategoryList.css';

import ItemsList from '../ItemsList/ItemsList.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

class CategoryList extends PureComponent {
  render() {
    return <div className="CategoryList">
      <ActionInput placeholder="Enter category title"
                   actionTitle="Add"
                   onAct={ (value) => console.log('Category to add: ', value) }/>
      <ItemsList />
    </div>;
  }
}

export default CategoryList;
