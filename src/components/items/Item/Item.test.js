import React from 'react';
import { shallow } from 'enzyme';

import { Item, ItemMain, ItemActions, ItemSection } from './';

describe('define Item which', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <Item>Content</Item>
    );
  });

  it('should render <div> element with children', () => {
    const wrapper = rendered.find('div');
    expect(wrapper.text()).toBe('Content');
  });
});

it('define ItemMain which renders <span> element with children', () => {
  const rendered = shallow(<ItemMain>Main text</ItemMain>);
  const wrapper = rendered.find('span');
  expect(wrapper.text()).toBe('Main text');
});

it('define ItemActions which renders <span> element with children', () => {
  const rendered = shallow(<ItemActions>Actions</ItemActions>);
  const wrapper = rendered.find('span');
  expect(wrapper.text()).toBe('Actions');
});

it('define ItemSection which renders <span> element with children', () => {
  const rendered = shallow(<ItemSection>Sections</ItemSection>);
  const wrapper = rendered.find('span');
  expect(wrapper.text()).toBe('Sections');
});
