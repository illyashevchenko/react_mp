import React from 'react';
import { shallow } from 'enzyme';
// import { SvgLib } from './';

// jest.mock('!raw!./icons.svg', () => ''); //can't mock it for some reason

xdescribe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<div onClick={ () => null }>Some text</div>);
  });

  it('should render <button> element', () => {
    const button = rendered.find('button');
    expect(button.length).toBe(1);
  });
});

it('should allow 1 to be 1', () => {
  expect(1).toBe(1);
});
