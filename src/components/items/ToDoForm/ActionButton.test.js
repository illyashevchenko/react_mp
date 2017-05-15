import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from './ActionButton';
import { Button } from '../../controls/Button';


describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<ActionButton title="Submit" onClick={ () => null }/>);
  });

  it('should render <Button> element', () => {
    const container = rendered.find(Button);
    expect(container.length).toBe(1);
  });
});
