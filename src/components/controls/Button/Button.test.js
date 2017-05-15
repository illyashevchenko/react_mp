import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<Button onClick={ () => null }>Some text</Button>);
  });

  it('should render <button> element', () => {
    const button = rendered.find('button');
    expect(button.length).toBe(1);
  });
});
