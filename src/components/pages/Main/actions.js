import { filter, prop, pipe, objOf, reject, whereEq, flip, useWith, identity } from 'ramda';

const completedList = filter(prop('done'));
const completedPercentage = (tasks) => {
  const completed = completedList(tasks).length;
  const all = tasks.length;

  return Math.round(100 * completed / all);
};

const removeCategory = (list) => list;


const belongsToCategory = pipe(
  objOf('categoryId'),
  whereEq
);
const removeByCategory = useWith(reject, [belongsToCategory, identity]);

export default {
  completedPercentage,
  removeCategory,
  removeTaskByCategory: flip(removeByCategory),
};
