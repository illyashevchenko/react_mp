import React from 'react';
import { shallow } from 'enzyme';

import { MainPage } from './Main';
import { Header } from '../../components/page-elements/Header';
import { ProgressBar } from '../../components/page-elements/ProgressBar';
// import { ToDoFilter } from '../../components/page-elements/ToDoFilter';
// import { CategorySelectList } from '../../components/items/CategorySelectList';
// import { TodoList } from '../../components/items/TodoList';
// import { TwoRows } from '../../components/layouts/TwoRows';

const actions = {
  categories: {
    remove: () => null,
    addNested: () => null,
    addRoot: () => null,
    editConfirm: () => null,
    editCancel: () => null,
  },
  tasks: {
    add: () => null,
    toggleDone: () => null,
  },
};

const match = { params: {} };
const history = { push: () => null };
const location = { pathname: '', query: '' };

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <MainPage
        actions={ actions }
        categories={ [] }
        tasks={ [] }
        match={ match }
        history={ history }
        location={ location }
      />
    );
  });

  it('should render <Header> component', () => {
    const container = rendered.find(Header);

    expect(container.length).toBe(1);
  });

  it('should render <ProgressBar> component', () => {
    const container = rendered.find(ProgressBar);

    expect(container.length).toBe(1);
  });
});
