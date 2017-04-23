import React from 'react';
import PropTypes from 'prop-types';

import { CategoryList, CategoryListContainer } from '../CategoryList';

import { Pure } from '../../HOC/Pure';

export const CategoryAssignList = Pure(
  ({ categories, actions = {} }) => (
    <CategoryListContainer>
      <CategoryList
        {...{ categories, actions }}/>
    </CategoryListContainer>
  )
);

CategoryAssignList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.shape({}),
};
