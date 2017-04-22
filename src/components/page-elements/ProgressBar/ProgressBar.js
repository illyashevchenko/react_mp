import React from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.css';

import { Pure } from '../../HOC/Pure';

const styles = {};
const getWidth = (complete) => `${ complete }%`;

const getStyles = (complete) => Object.assign({
  width: getWidth(complete),
}, styles);

const ProgressBarRender = ({ complete }) =>
  <div className="ProgressBar">
    <div className="ProgressBar__bar"
         style={ getStyles(complete) }/>
  </div>;

ProgressBarRender.PropTypes = {
  complete: PropTypes.number.isRequired,
};

export const ProgressBar = Pure(ProgressBarRender);
