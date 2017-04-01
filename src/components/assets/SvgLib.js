import React from 'react';
import icons from '!raw!./icons.svg'; // eslint-disable-line import/no-webpack-loader-syntax

const SvgLib = () =>
  <span style={ { display: 'none' } }
        dangerouslySetInnerHTML={ { __html: icons } }/>;

export default SvgLib;
