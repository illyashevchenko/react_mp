import React from 'react';
import { shallow } from 'enzyme';

import { IconButton } from './';
import { Button } from '../Button';
import { Icon } from '../Icon';

describe.only('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<IconButton name="edit" onClick={ () => null }/>);
  });

  it('should render <Button> element', () => {
    const container = rendered.find(Button);
    expect(container.length).toBe(1);
  });

  it('should render <Icon> element', () => {
    const container = rendered.find(Icon);
    expect(container.length).toBe(1);
  });
});
