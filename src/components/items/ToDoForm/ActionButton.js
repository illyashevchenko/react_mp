import React from 'react';

import { Button } from '../../controls/Button';
import { Pure } from '../../HOC/Pure';

export const ActionButton = Pure(({ title, onClick, disabled }) => (
  <Button
    className="ToDoForm__actions-button"
    onClick={ onClick }
    disabled={ disabled }>{ title }</Button>
));
