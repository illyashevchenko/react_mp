import React from 'react';
import { shallow } from 'enzyme';

import { ToDoForm } from './';
import { ActionButton } from './ActionButton';

const actions = {
  confirm: jest.fn(),
  cancel: jest.fn(),
  update: jest.fn(),
};

afterEach(() => {
  actions.confirm.mockClear();
  actions.cancel.mockClear();
  actions.update.mockClear();
});

const values = { title: 'foo-bar', done: true, description: 'well...' };
const selectors = {
  input: 'input[type="text"]',
  checkbox: 'input[type="checkbox"]',
  textarea: 'textarea',
};

let rendered;

beforeEach(() => {
  rendered = shallow(
    <ToDoForm
      values={ values }
      actions={ actions }/>
  );
});

describe('on init', () => {
  it('should render <form> element', () => {
    const wrapper = rendered.find('form');
    expect(wrapper.length).toBe(1);
  });

  it('should render two <ActionButton> elements for form controls', () => {
    const wrapper = rendered.find(ActionButton);
    expect(wrapper.length).toBe(2);
  });

  it('should render input for title with set value', () => {
    const wrapper = rendered.find(selectors.input);
    expect(wrapper.prop('value')).toBe(values.title);
  });

  it('should render checkbox for done status with set value', () => {
    const wrapper = rendered.find(selectors.checkbox);
    expect(wrapper.prop('checked')).toBe(values.done);
  });

  it('should render textarea for description with set  value', () => {
    const wrapper = rendered.find(selectors.textarea);
    expect(wrapper.prop('value')).toBe(values.description);
  });
});

describe('on user interaction', () => {
  let saveButton;

  beforeEach(() => {
    saveButton = rendered.find(ActionButton).first();
  });

  describe('with title input', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = rendered.find(selectors.input);
    });

    it('should update new title via props', () => {
      wrapper.simulate('change', { target: { value: 'new-baz' } });
      expect(actions.update).toHaveBeenCalledWith({ title: 'new-baz' });
    });

    it('should not allow to set empty title', () => {
      wrapper.simulate('change', { target: { value: '' } });
      expect(saveButton.prop('disabled')).toBe(false);
    });
  });

  it('should update new done value via props', () => {
    const checkbox = rendered.find(selectors.checkbox);
    checkbox.simulate('change', { target: { checked: false } });
    expect(actions.update).toHaveBeenCalledWith({ done: false });
  });

  it('should update new description via props', () => {
    const textarea = rendered.find(selectors.textarea);
    textarea.simulate('change', { target: { value: 'so...' } });
    expect(actions.update).toHaveBeenCalledWith({ description: 'so...' });
  });

  it('should allow to submit form', () => {
    saveButton.simulate('click');
    expect(actions.confirm).toHaveBeenCalled();
  });

  it('should allow to cancel form', () => {
    const cancelButton = rendered.find(ActionButton).last();

    cancelButton.simulate('click');
    expect(actions.cancel).toHaveBeenCalled();
  });
});


it('should set error className on empty title', () => {
  const rendered = shallow(
    <ToDoForm
      values={ Object.assign({}, values, { title: '' }) }
      actions={ actions }/>
  );
  const wrapper = rendered.find(selectors.input);
  expect(wrapper.prop('className')).toContain('error');
});
