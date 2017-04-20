import React from 'react';
import './Category.css';

import Item from '../Item';
import IconButton from '../../controls/IconButton';

const getAction = (action, { actions, item }) =>
  () => actions[action](item);

/**
 *
 * @param { { item: { title: string }, actions: { [string]: function }} } props
 * @constructor
 */
const Category = (props) => (
  <Item size="small" { ...props }>
    <span className="Item__section"/>
    <span className="Item__main">
      <span className="Item__section">{ props.item.title }</span>
      <IconButton className="Item__button"
                  name="edit"
                  size="small"
                  onClick={ getAction('edit', props) }/>
      </span>
    <span className="Item__actions">
      <IconButton className="Item__button"
                  name="remove"
                  size="small"
                  onClick={ getAction('remove', props) }/>
      <IconButton className="Item__button"
                  name="add"
                  size="small"
                  onClick={ getAction('addNested', props) }/>
    </span>
  </Item>
);

export default Category;
