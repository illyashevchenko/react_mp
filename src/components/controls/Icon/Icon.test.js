import React from 'react';
import { shallow } from 'enzyme';
import { Icon } from './';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Icon name="edit"/>);
  });

  it('should render <svg> element', () => {
    const container = rendered.find('svg');
    expect(container.length).toBe(1);
  });
});
