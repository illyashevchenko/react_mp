import React from 'react';
import { shallow } from 'enzyme';

import { ToDo } from './';
import { Item } from '../Item';
import { IconButton } from '../../controls/IconButton';

const item = { done: true, title: 'foo-bar' };
const actions = {
  edit: jest.fn(),
  toggle: jest.fn(),
};

const selectors = {
  checkbox: 'input[type="checkbox"]',
};

afterEach(() => {
  actions.edit.mockClear();
  actions.toggle.mockClear();
});

let rendered;

beforeEach(() => {
  rendered = shallow(
    <ToDo item={ item } actions={ actions }/>
  );
});

describe('on init', () => {
  it('should render <Button> element', () => {
    const wrapper = rendered.find(Item);
    expect(wrapper.length).toBe(1);
  });

  it('should render checkbox with set value', () => {
    const wrapper = rendered.find(selectors.checkbox);
    expect(wrapper.prop('checked')).toBe(item.done);
  });

  it('should render <IconButton> with set value', () => {
    const wrapper = rendered.find(IconButton);
    expect(wrapper.prop('name')).toEqual(expect.any(String));
  });
});

describe('on user interaction', () => {
  it('should call toggle action when checkbox is changed', () => {
    const wrapper = rendered.find(selectors.checkbox);
    wrapper.simulate('change');
    expect(actions.toggle).toHaveBeenCalledWith(item);
  });

  it('should call edit action when clicked on IconButton', () => {
    const wrapper = rendered.find(IconButton);
    wrapper.simulate('click');
    expect(actions.edit).toHaveBeenCalledWith(item);
  });
});
