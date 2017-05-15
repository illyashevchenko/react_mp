import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Header />);
  });

  it('should render <h1> element', () => {
    const container = rendered.find('h1');
    expect(container.length).toBe(1);
  });
});
