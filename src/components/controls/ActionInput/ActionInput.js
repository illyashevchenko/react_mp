import React, { PureComponent } from 'react';
import './ActionInput.css';

import Button from '../Button/Button.js'

class ActionInput extends PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.buttonSiblingOn = ['left'];
  }

  onClick() {

  }

  render() {
    return (
      <div className="ActionInput">
        <input className="ActionInput__input"/>
        <Button className="ActionInput__button"
                siblingOn={ this.buttonSiblingOn }
                onClick={ this.onClick }>Add</Button>
      </div>
    );
  }
}

export default ActionInput;
