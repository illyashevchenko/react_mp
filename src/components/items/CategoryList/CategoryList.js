import React, { PureComponent, PropTypes } from 'react';
import './CategoryList.css';

import ItemList from '../ItemList/ItemList.js';
import Category from '../Category/Category.js';
import ActionInput from '../../controls/ActionInput/ActionInput.js';

import actions from './actions';

class CategoryList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.categoryActions = {
      remove: props.actions.remove,
      addNested: this.addNested.bind(this),
      edit: this.edit.bind(this),
    }
  }

  add(title) {
    if (!title) {
      return;
    }

    this.props.actions.set(
      actions.addCategory(this.props.categories, title)
    );
  }

  addNested(item) {
    console.log('add nested to ', item);
  }

  edit(item) {
    console.log('edit', item);
  }

  render() {
    const { categories, active, actions: { select } } = this.props;

    this.categoryActions.select = this.categoryActions.select || select;

    return <div className="CategoryList">
      <ActionInput
        className="CategoryList__input"
        placeholder="Enter category title"
        actionTitle="Add"
        onAct={ this.add }/>
      <ItemList
        className="CategoryList__list"
        list={ actions.getTree(categories) }
        active={ active }
        actions={ this.categoryActions }
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
    remove: PropTypes.func.isRequired,
  }),
};

export default CategoryList;
