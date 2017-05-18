import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import { godReducer } from '../reducers';
import { stubData } from './stub-data';

const logger = createLogger();

export const store = createStore(godReducer, stubData, applyMiddleware(logger));
