import React from 'react';
import { shallow } from 'enzyme';
import { ToDoFilter } from './ToDoFilter';

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ToDoFilter
        actions={ { set: () => null }}
        filter={ { search: '', showDone: false } }/>
    );
  });

  it('should render a checkbox', () => {
    const container = rendered.find('input[type="checkbox"]');

    expect(container.length).toBe(1);
  });

  it('should render an input for filter', () => {
    const container = rendered.find('input[type="text"]');

    expect(container.length).toBe(1);
  });
});
