import React from 'react';
import icons from '!raw!./icons.svg'; // eslint-disable-line import/no-webpack-loader-syntax

export const SvgLib = () =>
  <span style={ { display: 'none' } }
    dangerouslySetInnerHTML={ { __html: icons } }/>;
