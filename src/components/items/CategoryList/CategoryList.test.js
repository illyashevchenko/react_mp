import React from 'react';
import { shallow } from 'enzyme';

import { CategoryListContainer, CategoryList } from './';
import { ItemList } from '../ItemList';

const Element = () => ({});

describe('defines CategoryList which', () => {
  it('should render <ItemList> element', () => {
    const rendered = shallow(
      <CategoryList
        Element={ Element }
        active={ {} }
        actions={ {} }
        categories={ [] }/>
    );
    const wrapper = rendered.find(ItemList);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      Element,
      list: [],
      active: {},
      actions: {},
    }));
  });

  it('should handle tree structure while rendering <ItemList> element', () => {
    const rendered = shallow(
      <CategoryList
        Element={ Element }
        active={ {} }
        actions={ {} }
        categories={ [] }/>
    );
    const wrapper = rendered.find(ItemList);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      Element,
      list: [],
      active: {},
      actions: {},
    }));
  });
});

describe('defines CategoryListContainer which', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <CategoryListContainer>Nested content</CategoryListContainer>
    );
  });

  it('should render <div> element with children', () => {
    const wrapper = rendered.find('div');
    expect(wrapper.text()).toBe('Nested content');
  });
});
