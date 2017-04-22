import React from 'react';
import PropTypes from 'prop-types';

import { Pure } from '../../HOC/Pure';
import './TwoRows.css';

function TwoRowsRender({ left, right, className }) {
  return (
    <div className={ `TwoRows ${ className }` }>
      <div className="TwoRows__left">
        { left }
      </div>
      <div className="TwoRows__right">
        { right }
      </div>
    </div>);
}

TwoRowsRender.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};

export const TwoRows = Pure(TwoRowsRender);
