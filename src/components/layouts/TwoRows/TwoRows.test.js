import React from 'react';
import { shallow } from 'enzyme';
import { TwoRows } from './TwoRows';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<TwoRows left={ <section /> } right={ <section /> }/>);
  });

  it('should render left and right elements', () => {
    const container = rendered.find('section');
    expect(container.length).toBe(2);
  });
});
