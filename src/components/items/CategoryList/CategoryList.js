import React, { PureComponent, PropTypes } from 'react';
import './CategoryList.css';

import ItemList from '../ItemList/ItemList.js';
import Category from '../Category/Category.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

class CategoryList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
  }

  add(title) {
    if (!title) {
      return;
    }

    const categories = this.props.categories;

    const ids = categories.map((category) => category.id);
    const maxId = Math.max(...ids);

    this.props.actions.set([
      { title, id: maxId + 1 },
      ...categories,
    ]);
  }

  remove() {

  }

  edit() {

  }

  render() {
    return <div className="CategoryList">
      <ActionInput
        className="CategoryList__input"
        placeholder="Enter category title"
        actionTitle="Add"
        onAct={ this.add }/>
      <ItemList
        className="CategoryList__list"
        list={ this.props.categories }
        select={ this.props.actions.select }
        Element={ Category }
        keyPath="id"/>
    </div>;
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    set: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }),
};

export default CategoryList;
