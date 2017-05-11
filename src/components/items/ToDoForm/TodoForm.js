import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ramda from 'ramda';

import './TodoForm.css';

import { Button } from '../../controls/Button';
import { Pure } from '../../HOC/Pure';

const ActionButton = Pure(({ title, onClick, disabled }) => (
  <Button
    className="ToDoForm__actions-button"
    onClick={ onClick }
    disabled={ disabled }>{ title }</Button>
));

const { map, concat, pipe, join, filter, identity } = Ramda;
const getFormClass = concat('ToDoForm__');
const getFormClasses = pipe(
  filter(identity),
  map(getFormClass),
  join(' ')
);

export class ToDoForm extends PureComponent {
  getUpdater(valueName, targetProp) {
    return (event) => {
      this.props.actions.update({ [valueName]: event.target[targetProp] })
    }
  }

  render() {
    const { done, title, description } = this.props.values;
    const { confirm, cancel } = this.props.actions;

    return (
      <form className="ToDoForm">
        <div className={ getFormClass('actions') }>
          <ActionButton
            title="Save changes"
            onClick={ confirm }
            disabled={ !title }/>
          <ActionButton
            title="Cancel"
            onClick={ cancel }/>
        </div>
        <div className={ getFormClass('form') }>
          <input
            className={ getFormClasses(
              ['form-element', 'form-input', 'form-input--short', !title && 'form-input--error']
            ) }
            type="text"
            value={ title }
            onChange={ this.getUpdater('title', 'value') }/>
          <label className={ getFormClasses(['form-element', 'form-checkbox']) }>
            <input
              type="checkbox"
              className={ getFormClass('form-checkbox-input') }
              checked={ done }
              onChange={ this.getUpdater('done', 'checked') }/>
            Done
          </label>
          <textarea
            className={ getFormClasses(['form-element', 'form-input', 'form-input--vertical']) }
            rows="7"
            value={ description }
            onChange={ this.getUpdater('description', 'value') }/>
        </div>
      </form>
    );
  }
}

ToDoForm.propTypes = {
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
    description: PropTypes.string,
  }),
  actions: PropTypes.shape({
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }),
};
