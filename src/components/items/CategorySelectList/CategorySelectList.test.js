import React from 'react';
import { shallow } from 'enzyme';

import { CategorySelectList } from './';

import { ActionInput } from '../../controls/ActionInput';

import { CategoryList, CategoryListContainer } from '../CategoryList';
import { Category } from '../Category';

const actions = {
  select: jest.fn(),
  remove: jest.fn(),
  addNested: jest.fn(),
  addRoot: jest.fn(),
  editConfirm: jest.fn(),
  editCancel: jest.fn(),
};

afterEach(() => {
  actions.select.mockClear();
  actions.remove.mockClear();
  actions.addNested.mockClear();
  actions.addRoot.mockClear();
  actions.editConfirm.mockClear();
  actions.editCancel.mockClear();
});

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <CategorySelectList
        categories={ [] }
        active={ {} }
        actions={ actions }/>
    );
  });

  it('should render <CategoryListContainer> element', () => {
    const wrapper = rendered.find(CategoryListContainer);
    expect(wrapper.length).toBe(1);
  });

  it('should render <ActionInput> element', () => {
    const wrapper = rendered.find(ActionInput);
    expect(wrapper.length).toBe(1);
  });

  it('should render <CategoryList> element with set props', () => {
    const wrapper = rendered.find(CategoryList);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      Element: Category,
      active: {},
      categories: [],
    }));
  });
});
