import React from 'react';
import './Category.css';

import Pure from '../../HOC/Pure';
import CategoryBase from './CategoryBase';

const viewAble = {
  buttons: {
    title: [
      { name: 'edit', action: 'edit' },
    ],
    tools: [
      { name: 'remove', action: 'remove' },
      { name: 'add', action: 'addNested' },
    ],
  },
};

const getViewable = (props) => Object.assign({}, props, viewAble);

const editAble = {
  getTitle(props) {
    return (
      <input
        style={ { width: '100%' } }
        value={ props.item.title }/>
    );
  },
  buttons: {
    tools: [
      { name: 'checked', action: 'confirm' },
      { name: 'cancel', action: 'cancel' },
    ],
  },
};

const getEditable = (props) => Object.assign({}, props, editAble);

/**
 *
 * @param { { item: { title: string }, actions: { [string]: function }} } props
 * @constructor
 */
const Category = (props) => (
  props.item.inEdit
    ? CategoryBase(getEditable(props))
    : CategoryBase(getViewable(props))
);

export default Pure(Category);
