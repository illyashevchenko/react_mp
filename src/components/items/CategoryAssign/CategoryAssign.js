import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Item, ItemSection, ItemMain, ItemActions } from '../Item';
import { renderButtons } from '../helpers';


export class CategoryAssign extends PureComponent {
  getViewToolButtons() {
    const { actions, item } = this.props;

    return renderButtons([
      { name: 'remove', action: actions.assign.bind(null, item) },
    ]);
  }

  render() {
    const { item } = this.props;

    return (
      <Item
        { ...{ item } }>
        <ItemSection/>
        <ItemMain>
          { item.title }
        </ItemMain>
        <ItemActions>
          { this.getViewToolButtons() }
        </ItemActions>
      </Item>
    );
  }
}

CategoryAssign.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    assign: PropTypes.func.isRequired,
  }),
};
