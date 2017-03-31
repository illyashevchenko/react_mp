import React, { PureComponent } from 'react';
import './CategoryList.css';

import ItemsList from '../ItemsList/ItemsList.js';

class CategoryList extends PureComponent {
  render() {
    return <div className="CategoryList">
      Category List:
      <ItemsList />
    </div>;
  }
}

export default CategoryList;
