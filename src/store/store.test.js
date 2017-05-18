jest.mock('redux', () => ({
  createStore: jest.fn().mockReturnValue({ store: true }),
  applyMiddleware: jest.fn((arg) => arg),
}));

jest.mock('redux-logger', () => ({
  createLogger: () => ({ logger: true }),
}));

jest.mock('../reducers', () => ({ godReducer: { reducer: true } }));

const redux = require('redux');
const { godReducer } = require('../reducers');

import { store } from './';

describe('on init', () => {
  afterEach(() => {
    redux.createStore.mockClear();
    redux.applyMiddleware.mockClear();
  });

  it('should create store', () => {
    expect(redux.createStore).toHaveBeenCalledWith(godReducer, expect.any(Object), { logger: true });
  });

  it('should apply middleware', () => {
    // expect(redux.applyMiddleware).toHaveBeenCalledWith(logger);
  });

  it('should be a store', () => {
    expect(store).toEqual({ store: true });
  });
});
