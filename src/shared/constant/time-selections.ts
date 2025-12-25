import _ from 'lodash';

export const HOURS = _.range(0, 24).map(h => _.padStart(String(h), 2, '0'));

const MINUTES_STEP = 5;
export const MINUTES = _.range(0, 60, MINUTES_STEP).map(m =>
  _.padStart(String(m), 2, '0')
);

export const DEFAULT_TIME = {
  hour: '00',
  minute: '00',
};
