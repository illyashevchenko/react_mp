import React from 'react';
import { shallow } from 'enzyme';

import { CategoryAssign } from './';
import { Item } from '../Item';

const item = {};
const actions = {
  assign: jest.fn(),
};

afterEach(() => {
  actions.assign.mockClear();
});

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <CategoryAssign
        item={ item }
        actions={ actions }
        isActive/>
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
