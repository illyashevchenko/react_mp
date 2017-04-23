import React from 'react';
import PropTypes from 'prop-types';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { CategoryAssign } from '../CategoryAssign';

import { Pure } from '../../HOC/Pure';

export const CategoryAssignList = Pure(
  ({ categories, actions = {}, assigned: active }) => (
    <CategoryListContainer>
      <CategoryList
        Element={ CategoryAssign }
        {...{ categories, actions, active }}/>
    </CategoryListContainer>
  )
);

CategoryAssignList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    assign: PropTypes.func.isRequired,
  }),
};
