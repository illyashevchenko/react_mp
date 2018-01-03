import React from 'react';
import { shallow } from 'enzyme';

import { TodoList } from './';
import { ItemList } from '../ItemList';
import { ToDo } from '../ToDo';
import { ActionInput } from '../../controls/ActionInput';

const actions = {
  toggleDone: () => null,
  add: () => null,
  select: () => null,
};

describe('TodoList', () => {
  it('should render <ActionInput>', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [] }/>
    );
    const container = rendered.find(ActionInput);

    expect(container.length).toBe(1);
  });

  it('should render <ItemList> with props', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [{ categoryId: 1 }] }/>
    );
    const container = rendered.find(ItemList);

    expect(container.length).toBe(1);
    expect(container.props()).toEqual(expect.objectContaining({
      list: [{ categoryId: 1 }],
      Element: ToDo,
      actions: expect.any(Object),
    }));
  });
});
