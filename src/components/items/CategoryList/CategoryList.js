import React from 'react';
import PropTypes from 'prop-types';

import './CategoryList.css';

import { ItemList } from '../ItemList';
import { Pure } from '../../HOC/Pure';

import commonActions from './actions';

export const CategoryListContainer = Pure(({ children }) => (
  <div className="CategoryList">
    { children }
  </div>
));

export const CategoryList = Pure(
  ({ categories, active, actions, Element }) => (
    <ItemList
      className="CategoryList__list"
      list={ commonActions.getTree(categories) }
      { ...{ active, actions, Element } }
      keyPath="id"/>
  )
);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  Element: PropTypes.func.isRequired,
  active: PropTypes.object,
  actions: PropTypes.object,
};
