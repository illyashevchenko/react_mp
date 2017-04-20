import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ToDo.css';

import Header from '../../page-elements/Header';
import CategoryList from '../../items/CategoryList';
import TwoRows from '../../layouts/TwoRows';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.categoriesActions = {};
  }

  createCategoryList() {
    const { categories } = this.props;

    return (
      <CategoryList
        categories={ categories }
        actions={ this.categoriesActions }/>
    );
  }

  render() {
    return (
      <div className="page-ToDo page">
        <div className="page__section-static">
          <Header text="To-Do List"/>
        </div>
        <TwoRows
          className="page__section-flexible"
          left={ this.createCategoryList() }
          right={ <div>Here will be a form for: </div> }/>
      </div>
    );
  }
}


Main.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Main;
