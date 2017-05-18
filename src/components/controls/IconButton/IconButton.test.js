import React from 'react';
import { shallow } from 'enzyme';

import { IconButton } from './';
import { Button } from '../Button';
import { Icon } from '../Icon';

describe('basically', () => {
  const onClick = jest.fn();
  afterEach(() => {
    onClick.mockClear();
  });

  let rendered;

  beforeEach(() => {
    rendered = shallow(<IconButton name="edit" onClick={ onClick }/>);
  });

  it('should render <Button> element', () => {
    const wrapper = rendered.find(Button);
    expect(wrapper.length).toBe(1);
  });

  it('should render <Icon> element', () => {
    const wrapper = rendered.find(Icon);
    expect(wrapper.length).toBe(1);
  });

  describe('on user interaction', () => {
    let event;
    let wrapper;

    afterEach(() => {
      event.stopPropagation.mockClear();
    });

    beforeEach(() => {
      event = {
        stopPropagation: jest.fn(),
      };

      wrapper = rendered.find(Button);
      wrapper.simulate('click', event);
    });

    it('should fire onClick when <Button> is clicked', () => {
      expect(onClick).toHaveBeenCalledWith(event);
    });

    it('should prevent event from propagation', () => {
      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });
});
