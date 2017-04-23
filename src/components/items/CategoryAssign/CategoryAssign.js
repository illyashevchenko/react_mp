import React from 'react';
import PropTypes from 'prop-types';

import { Item, ItemSection, ItemMain, ItemActions } from '../Item';
import { renderButtons } from '../helpers';

import { Pure } from '../../HOC/Pure';

const getViewToolButtons = ({ actions, item, isActive }) =>
  renderButtons([
    !isActive && { name: 'remove', action: actions.assign.bind(null, item) },
  ]);

const CategoryAssignRender = (props) => (
  <Item
    item={ props.item }
    isActive={ props.isActive }
    staticTools>
    <ItemSection/>
    <ItemMain>
      { props.item.title }
    </ItemMain>
    <ItemActions>
      { getViewToolButtons(props) }
    </ItemActions>
  </Item>
);

export const CategoryAssign = Pure(CategoryAssignRender);

CategoryAssign.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    assign: PropTypes.func.isRequired,
  }),
};
