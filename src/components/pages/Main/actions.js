import { filter, prop } from 'ramda';

const completedList = filter(prop('done'));
const completedPercentage = (tasks) => {
  const completed = completedList(tasks).length;
  const all = tasks.length;

  return Math.round(100 * completed / all);
};

export default {
  completedPercentage,
};
