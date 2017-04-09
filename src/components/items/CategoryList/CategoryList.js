import React, { PureComponent, PropTypes } from 'react';
import './CategoryList.css';

import ItemList from '../ItemList/ItemList.js';
import Category from '../Category/Category.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

class CategoryList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.categoryActions = {
      remove: this.remove.bind(this),
      edit: this.edit.bind(this),
    }
  }

  add(title) {
    if (!title) {
      return;
    }

    const categories = this.props.categories;

    this.props.actions.set([
      { title, id: Date.now() },
      ...categories,
    ]);
  }

  remove() {

  }

  edit() {

  }

  render() {
    const { categories, active, actions: { select } } = this.props;
    return <div className="CategoryList">
      <ActionInput
        className="CategoryList__input"
        placeholder="Enter category title"
        actionTitle="Add"
        onAct={ this.add }/>
      <ItemList
        className="CategoryList__list"
        list={ categories }
        active={ active }
        actions={ { ...this.categoryActions, select } }
        Element={ Category }
        keyPath="id"/>
    </div>;
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.object,
  actions: PropTypes.shape({
    set: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
  }),
};

export default CategoryList;
