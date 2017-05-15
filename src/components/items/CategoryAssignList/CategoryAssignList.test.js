import React from 'react';
import { shallow } from 'enzyme';

import { CategoryAssignList } from './';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { CategoryAssign } from '../CategoryAssign';

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
      <CategoryAssignList
        categories={ [item] }
        assigned={ item }
        actions={ actions }/>
    );
  });

  it('should render <CategoryListContainer> element', () => {
    const wrapper = rendered.find(CategoryListContainer);
    expect(wrapper.length).toBe(1);
  });

  it('should render <CategoryList> element', () => {
    const wrapper = rendered.find(CategoryList);
    expect(wrapper.props()).toEqual({
      Element: CategoryAssign,
      categories: [item],
      actions: actions,
      active: item,
    });
  });
});
