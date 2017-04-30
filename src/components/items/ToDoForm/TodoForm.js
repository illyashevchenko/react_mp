import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Ramda from 'ramda';

import './TodoForm.css';

import { pick } from 'ramda';

import { Button } from '../../controls/Button';
import { Pure } from '../../HOC/Pure';

const ActionButton = Pure(({ title, onClick }) => (
  <Button
    className="ToDoForm__actions-button"
    onClick={ onClick }>{ title }</Button>
));

const { map, concat, pipe, join } = Ramda;
const getFormClass = concat('ToDoForm__');
const getFormClasses = pipe(
  map(getFormClass),
  join(' ')
);

const pickProps = pick(['title', 'done', 'description']);

export class ToDoForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = pickProps(props.item);

    this.updateState = this.updateState.bind(this);

    this.confirm = this.getAction('confirm');
    this.cancel = this.getAction('cancel');
  }

  updateState(prop, path) {
    return (event) => {
      this.setState({ [prop]: event.target[path] })
    }
  }

  getAction(name) {
    const { actions, item } = this.props;

    return () => {
      actions[name](item, pickProps(this.state));
    };
  }

  render() {
    const { done, title, description } = this.state;

    return (
      <form className="ToDoForm">
        <div className={ getFormClass('actions') }>
          <ActionButton
            title="Save changes"
            onClick={ this.confirm }/>
          <ActionButton
            title="Cancel"
            onClick={ this.cancel }/>
        </div>
        <div className={ getFormClass('form') }>
          <input
            className={ getFormClasses(['form-element', 'form-input', 'form-input--short']) }
            type="text"
            value={ title }
            onChange={ this.updateState('title', 'value') }/>
          <label className={ getFormClasses(['form-element', 'form-checkbox']) }>
            <input
              type="checkbox"
              className={ getFormClass('form-checkbox-input') }
              value={ done }
              onChange={ this.updateState('done', 'checked') }/>
            Done
          </label>
          <textarea
            className={ getFormClasses(['form-element', 'form-input', 'form-input--vertical']) }
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
  actions: PropTypes.shape({
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  }),
};
