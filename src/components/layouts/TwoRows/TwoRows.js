import React, { PropTypes } from 'react';
import Pure from '../../HOC/Pure/Pure';
import './TwoRows.css';

function TwoRows({ left, right, className }) {
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

TwoRows.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};

export default Pure(TwoRows);
