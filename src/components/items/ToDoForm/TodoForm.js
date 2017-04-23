import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TodoForm.css';

import { pick } from 'ramda';

import { Button } from '../../controls/Button';

export class ToDoForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = pick(['title', 'done', 'description'], props.item);

    this.updateState = this.updateState.bind(this);
  }

  updateState(prop, path) {
    return (event) => {
      this.setState({ [prop]: event.target[path] })
    }
  }

  render() {
    const { done, title, description } = this.state;

    return (
      <form className="ToDoForm">
        <div className="ToDoForm__actions">
          <Button
            className="ToDoForm__actions-button"
            onClick={ () => ({}) }>Save changes</Button>
          <Button
            className="ToDoForm__actions-button"
            onClick={ () => ({}) }>Cancel</Button>
        </div>
        <div className="ToDoForm__form">
          <input
            className="ToDoForm__form-element ToDoForm__form-input ToDoForm__form-input--short"
            type="text"
            value={ title }
            onChange={ this.updateState('title', 'value') }/>
          <label className="ToDoForm__form-element ToDoForm__form-checkbox">
            <input
              type="checkbox"
              className="ToDoForm__form-checkbox-input"
              value={ done }
              onChange={ this.updateState('done', 'checked') }/>
            Done
          </label>
          <textarea
            className="ToDoForm__form-element ToDoForm__form-input ToDoForm__form-input--vertical"
            rows="7"
            value={ description }
            onChange={this.updateState('description', 'value') }/>
        </div>
      </form>
    );
  }
}

ToDoForm.propTypes = {
  item: PropTypes.object.isRequired,
  actions: PropTypes.shape({}),
};
