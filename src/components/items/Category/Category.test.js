import React from 'react';
import { shallow } from 'enzyme';

import { Category } from './';
import { Item } from '../Item';

const item = {};
const actions = {
  select: jest.fn(),
  confirm: jest.fn(),
  cancel: jest.fn(),
  remove: jest.fn(),
  addNested: jest.fn(),
};

afterEach(() => {
  actions.select.mockClear();
  actions.confirm.mockClear();
  actions.cancel.mockClear();
  actions.remove.mockClear();
  actions.addNested.mockClear();
});

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <Category item={ item } isActive actions={ actions }/>
    );
  });

  it('should render <Item> element', () => {
    const wrapper = rendered.find(Item);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      item: item,
      isActive: true,
    }));
  });
});
