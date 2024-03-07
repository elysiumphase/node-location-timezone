import * as countries from './countries';
import * as locations from './locations';
import * as statesAnsi from './states-ansi';
import * as timezones from './timezones';

export default {
  ...countries,
  ...locations,
  ...statesAnsi,
  ...timezones,
};
