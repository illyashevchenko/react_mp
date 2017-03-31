import React, { PropTypes } from 'react';
import './TwoRows.css';

function TwoRows(props) {
  return (
    <div className="TwoRows">
      <div className="TwoRows__left">
        { props.left }
      </div>
      <div className="TwoRows__right">
        { props.right }
      </div>
    </div>);
}

TwoRows.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
};

export default TwoRows;
