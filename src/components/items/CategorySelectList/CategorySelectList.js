import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './CategorySelectList.css';

import { ActionInput } from '../../controls/ActionInput';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { Category } from '../Category';

import Actions from '../CategoryList/actions';

export class CategorySelectList extends PureComponent {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);
    this.actions = {
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

    set(
      Actions.addCategory(title, categories)
    );
  }

  addNested(parent) {
    const { categories, actions: { set } } = this.props;

    set(
      Actions.addNested(parent, categories)
    );
  }

  confirm(item, title) {
    const { categories, actions: { set } } = this.props;

    set(
      Actions.modifyCategory(categories, item, { title })
    );
  }

  cancel(item) {
    if (!Actions.shouldRemove(item)) {
      return;
    }

    this.props.actions.remove(item);
  }

  render() {
    const { categories, active } = this.props;

    return <CategoryListContainer>
      <ActionInput
        className="CategorySelectList-input"
        placeholder="Enter category title"
        actionTitle="Add"
        onAct={ this.add }/>
      <CategoryList
        categories={ categories }
        active={ active }
        actions={ this.actions }
        Element={ Category }/>
    </CategoryListContainer>;
  }
}

CategorySelectList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  active: PropTypes.object,
  actions: PropTypes.shape({
    set: PropTypes.func,
    select: PropTypes.func,
    remove: PropTypes.func,
  }),
};
