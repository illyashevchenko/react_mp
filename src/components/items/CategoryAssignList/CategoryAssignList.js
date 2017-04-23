import React from 'react';
import PropTypes from 'prop-types';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { CategoryAssign } from '../CategoryAssign';

import { Pure } from '../../HOC/Pure';

export const CategoryAssignList = Pure(
  ({ categories, actions = {} }) => (
    <CategoryListContainer>
      <CategoryList
        Element={ CategoryAssign }
        {...{ categories, actions }}/>
    </CategoryListContainer>
  )
);

CategoryAssignList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({
    assign: PropTypes.func.isRequired,
  }),
};
