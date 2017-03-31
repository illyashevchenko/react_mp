import React, { PureComponent } from 'react';
import './ActionInput.css';

import Button from '../Button/Button.js'

class ActionInput extends PureComponent {
  render() {
    return (
      <div>
        <input/>
        <Button>Add</Button>
      </div>
    );
  }
}

export default ActionInput;
