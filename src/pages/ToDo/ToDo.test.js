import React from 'react';
import { shallow } from 'enzyme';

import { ToDoPage } from './ToDo';
import { Header } from '../../components/page-elements/Header';
// import { CategoryAssignList } from '../../components/items/CategoryAssignList';
// import { ToDoForm } from '../../components/items/ToDoForm';
// import { TwoRows } from '../../components/layouts/TwoRows';

const actions = {
  modifyTask: () => null,
};

const match = { params: { taskId: '1' } };
const history = { push: () => null };

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ToDoPage
        actions={ actions }
        categories={ [{ id: 2 }] }
        tasks={ [{ id: 1, categoryId: 2, title: 'foo-bar' }] }
        match={ match }
        history={ history }
      />
    );
  });

  it('should render <Header> element', () => {
    const container = rendered.find(Header);

    expect(container.length).toBe(1);
  });
});
