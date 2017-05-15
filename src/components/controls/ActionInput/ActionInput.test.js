import React from 'react';
import { shallow } from 'enzyme';
import { ActionInput } from './';
import { Button } from '../Button';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<ActionInput actionTitle="Add item..." onAct={ () => null }/>);
  });

  it('should render <input> element', () => {
    const container = rendered.find('input');
    expect(container.length).toBe(1);
  });

  it('should render <Button> element', () => {
    const container = rendered.find(Button);
    expect(container.length).toBe(1);
  });
});
