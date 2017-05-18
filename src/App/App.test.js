import React from 'react';
import { shallow } from 'enzyme';

import { App } from './';

import {
  BrowserRouter,
  Route,
} from 'react-router-dom'

const routeCount = 2;

describe('basically', () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <App />
    );
  });

  it('should render <BrowserRouter> element', () => {
    const wrapper = rendered.find(BrowserRouter);
    expect(wrapper.length).toBe(1);
  });

  it('should render proper count of <Route> elements', () => {
    const wrapper = rendered.find(Route);
    expect(wrapper.length).toBe(routeCount);
  });
});
