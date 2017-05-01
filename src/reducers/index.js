import { stubData } from './stub-data';

export const godReducer = (state = stubData, action) =>
console.log(action) || state;
