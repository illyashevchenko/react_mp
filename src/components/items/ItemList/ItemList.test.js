import React from 'react';
import { shallow } from 'enzyme';

import { ItemList } from './';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ItemList list={ [] } Element={ () => ({}) } keyPath="id" />
    );
  });

  it('should render <div> element', () => {
    const wrapper = rendered.find('div');
    expect(wrapper.length).toBe(1);
  });
});
