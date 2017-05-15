import React from 'react';
import { shallow } from 'enzyme';
import { ProgressBar } from './ProgressBar';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<ProgressBar complete="50"/>);
  });

  it('should render progress by applying width style', () => {
    const container = rendered.find('div').last();

    expect(container.prop('style')).toEqual({ width: '50%' });
  });
});
