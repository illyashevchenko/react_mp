import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

import Pure from '../../HOC/Pure';

const styles = {};
const getWidth = (complete) => `${ complete }%`;

const getStyles = (complete) => Object.assign({
  width: getWidth(complete),
}, styles);

const ProgressBar = ({ complete }) =>
  <div className="ProgressBar">
    <div className="ProgressBar__bar"
         style={ getStyles(complete) }/>
  </div>;

ProgressBar.PropTypes = {
  complete: PropTypes.number.isRequired,
};

export default Pure(ProgressBar);
