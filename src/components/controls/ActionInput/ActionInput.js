import React, { PureComponent, PropTypes } from 'react';
import './ActionInput.css';

import Button from '../Button/Button.js'

class ActionInput extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);

    this.buttonSiblingOn = ['left'];
    this.state = { value: '' };
  }

  onClick() {
    this.act();
  }

  act() {
    this.props.onAct(this.state.value);
    this.clear();
  }

  clear() {
    this.setState({ value: '' });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyEvent(event) {
    switch (event.key) {
      case 'Escape':
        this.clear();
        break;
      case 'Enter':
        this.act();
        break;
      default:
    }
  }

  getInputClassName(hasButton) {
    return [
      this.inputBaseClass,
      hasButton && `${ this.inputBaseClass }--has-button`,
    ].join(' ');
  }

  inputBaseClass = 'ActionInput__input';

  render() {
    const { placeholder, actionTitle, className } = this.props;

    return (
      <div className={ `ActionInput ${ className }` }>
        <input className={ this.getInputClassName(actionTitle) }
               placeholder={ placeholder }
               value={ this.state.value }
               onChange={ this.handleChange }
               onKeyDown={ this.handleKeyEvent }/>

        { actionTitle &&
        <Button className="ActionInput__button"
                siblingOn={ this.buttonSiblingOn }
                onClick={ this.onClick }>{ actionTitle }</Button>
        }
      </div>
    );
  }

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    actionTitle: PropTypes.string,
    onAct: PropTypes.func.isRequired,
  }
}

export default ActionInput;
