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

describe('basically', () => {
  it('should render a <div> with no selected text if category is not provided', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [] }
        filter={ { search: '', onlyDone: false, categoryId: null } }/>
    );
    const container = rendered.find('div');

    expect(container.length).toBe(1);
  });

  it('should render <ActionInput> if category is provided', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [] }
        filter={ { search: '', onlyDone: false, categoryId: 1 } }/>
    );
    const container = rendered.find(ActionInput);

    expect(container.length).toBe(1);
  });

  it('should render <div> with message for empty list if tasks list is empty', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [] }
        filter={ { search: '', onlyDone: false, categoryId: 1 } }/>
    );
    const container = rendered.find('div');

    expect(container.length).toBe(2);
  });

  it('should render <ItemList> with props if tasks list is not empty', () => {
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ [{ categoryId: 1 }] }
        filter={ { search: '', onlyDone: false, categoryId: 1 } }/>
    );
    const container = rendered.find(ItemList);

    expect(container.length).toBe(1);
    expect(container.props()).toEqual(expect.objectContaining({
      list: [{ categoryId: 1 }],
      Element: ToDo,
      actions: expect.any(Object),
    }));
  });

  it('should filter tasks by title case-ignorant', () => {
    const tasks = [
      { title: 'foo-Bar', categoryId: 1 },
      { title: 'baz', categoryId: 1 },
    ];
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ tasks }
        filter={ { search: 'o-b', onlyDone: false, categoryId: 1 } }/>
    );
    const container = rendered.find(ItemList);

    expect(container.length).toBe(1);
    expect(container.props()).toEqual(expect.objectContaining({
      list: tasks.slice(0, 1),
    }));
  });

  it('should filter only done tasks', () => {
    const tasks = [
      { title: 'foo-Bar', done: true, categoryId: 1 },
      { title: 'foo-baz', done: false, categoryId: 1 },
      { title: 'baz', done: true, categoryId: 1 },
    ];
    const rendered = shallow(
      <TodoList
        actions={ actions }
        tasks={ tasks }
        filter={ { search: 'o-b', onlyDone: true, categoryId: 1 } }/>
    );
    const container = rendered.find(ItemList);

    expect(container.length).toBe(1);
    expect(container.props()).toEqual(expect.objectContaining({
      list: tasks.slice(0, 1),
    }));
  });
});
