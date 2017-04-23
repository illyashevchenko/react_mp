import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './ToDo.css';

import { Header } from '../../page-elements/Header';
import { CategoryAssignList } from '../../items/CategoryAssignList';
import { TwoRows } from '../../layouts/TwoRows';

export class ToDoPage extends PureComponent {
  constructor(props) {
    super(props);

    this.categoriesActions = {
      assign: this.assign.bind(this),
    };
  }

  assign(item) {
    console.log('Assign category ', item.title, ' to task ', this.props.match.params.taskId)
  }

  createCategoryList() {
    const { categories } = this.props;

    return (
      <CategoryAssignList
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
          right={ <div>Here will be a form for: { this.props.match.params.taskId }</div> }/>
      </div>
    );
  }
}

ToDoPage.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};
