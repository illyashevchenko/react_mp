import Ramda from 'ramda';
import * as PagesActions from '../actions';

const { filter, prop } = Ramda;

const completedList = filter(prop('done'));

export const completedPercentage = (tasks) => {
  const completed = completedList(tasks).length;
  const all = tasks.length;

  return Math.round(100 * completed / all);
};

const { pipe, flip, propOr } = Ramda;

const getSubIds = pipe(
  flip(PagesActions.findById),
  propOr([], 'subIds'),
);

const { curry, map, flatten, concat } = Ramda;


const idsToRemoveFromList = curry((list, id) => {
  const get = pipe(
    getSubIds,
    map(idsToRemoveFromList(list)),
    concat([id]),
    flatten
  );

  return get(list, id);
});

export const idsToRemove = flip(idsToRemoveFromList);
