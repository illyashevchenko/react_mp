import React from 'react';
import './Category.css';

import { curry } from 'ramda';

import { Item } from '../Item';
import { IconButton } from '../../controls/IconButton';

const getAction = (action, { actions, item }) =>
  () => actions[action](item);

const getButton = curry((props, button) =>
  <IconButton
    className="Item__button"
    name={ button.name }
    size="small"
    key={ button.action }
    onClick={ getAction(button.action, props) }/>
);

const getButtons = (props, buttons) =>
  buttons.map(getButton(props));

/**
 *
 * @param { { item: { title: string }, actions: { [string]: function }} } props
 * @constructor
 */
export const CategoryBase = (props) => (
  <Item size="small" { ...props }>
    <span className="Item__section"/>
    {
      props.getTitle
        ? (
        <span className="Item__main">
          { props.getTitle(props) }
        </span>
      )
        : (
        <span className="Item__main">
          <span className="Item__section">{ props.item.title }</span>
          { getButtons(props, props.buttons.title) }
        </span>
      )
    }
    <span className="Item__actions">
      { getButtons(props, props.buttons.tools) }
    </span>
  </Item>
);
