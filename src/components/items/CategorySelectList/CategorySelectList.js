import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './CategorySelectList.css';

import { ActionInput } from '../../controls/ActionInput';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { Category } from '../Category';

export class CategorySelectList extends PureComponent {
  constructor(props) {
    super(props);

    const { remove, select, addNested, editConfirm, editCancel } = props.actions;
    this.actions = {
      remove,
      select,
      addNested,
      confirm: editConfirm,
      cancel: editCancel,
    }
  }

  render() {
    const { categories, active, actions: { addRoot } } = this.props;

    return <CategoryListContainer>
      <ActionInput
        className="CategorySelectList-input"
        placeholder="Enter category title"
        actionTitle="Add"
        onAct={ addRoot}/>
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
    select: PropTypes.func,
    remove: PropTypes.func,
    addNested: PropTypes.func.isRequired,
    addRoot: PropTypes.func.isRequired,
    editConfirm: PropTypes.func.isRequired,
    editCancel: PropTypes.func.isRequired,
  }),
};
