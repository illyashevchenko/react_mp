import React from 'react';
import { shallow } from 'enzyme';

import { CategoryListContainer, CategoryList } from './';
import { ItemList } from '../ItemList';


describe('defines CategoryList which', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <CategoryList
        Element={ () => '' } active={ {} } actions={ {} } categories={ [] }/>
    );
  });

  xit('should render <ItemList> element', () => {
    const wrapper = rendered.find(ItemList);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      Element: () => '',
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
