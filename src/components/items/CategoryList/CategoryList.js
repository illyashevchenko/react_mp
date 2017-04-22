import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './CategoryList.css';

import ItemList from '../ItemList';
import Category from '../Category';
import ActionInput from '../../controls/ActionInput';

import actions from './actions';

class CategoryList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.categoryActions = {
      remove: props.actions.remove,
      select: props.actions.select,
      addNested: this.addNested.bind(this),
      confirm: this.confirm.bind(this),
      cancel: this.cancel.bind(this),
    }
  }

  add(title) {
    if (!title) {
      return;
    }

    const { categories, actions: { set } } = this.props;

    set(actions.addCategory(title, categories));
  }

  confirm(item, title) {
    const { categories, actions: { set } } = this.props;

    set(
      actions.modifyCategory(categories, item, { title })
    );
  }

  cancel(item) {
    if (!actions.shouldRemove(item)) {
      return;
    }

    this.props.actions.remove(item);
  }

  addNested(parent) {
    const { categories, actions: { set } } = this.props;

    set(
      actions.addNested(parent, categories)
    );
  }

  render() {
    const { categories, active } = this.props;

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
    set: PropTypes.func,
    select: PropTypes.func,
    remove: PropTypes.func,
  }),
};

export default CategoryList;
