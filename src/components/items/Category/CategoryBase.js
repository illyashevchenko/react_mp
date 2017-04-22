import React from 'react';
import './Category.css';

import { Item, ItemSection, ItemMain, ItemActions } from '../Item';
import { getButtons } from './helpers';

/**
 *
 * @param { { item: { title: string }, actions: { [string]: function }} } props
 * @constructor
 */
export const CategoryBase = (props) => (
  <Item { ...props }>
    <ItemSection/>
    {
      props.getTitle
        ? (
        <ItemMain>
          { props.getTitle(props) }
        </ItemMain>
      )
        : (
        <ItemMain>
          <ItemSection>{ props.item.title }</ItemSection>
          { getButtons(props, props.buttons.title) }
        </ItemMain>
      )
    }
    <ItemActions>
      { getButtons(props, props.buttons.tools) }
    </ItemActions>
  </Item>
);
