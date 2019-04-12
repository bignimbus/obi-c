import difference from 'lodash/difference';
import Tick from '../';
import { stubValidUser } from '../../User/__stubs__';
import { stubValidAssistant } from '../../Assistant/__stubs__';
import { stubValidCalendarEventWithNotification } from '../../CalendarEvent/__stubs__';

export const minutesAgo = n => new Date(new Date().getTime() - n * 60 * 1000);

const VALID_PROPS = [
  'user',
  'assistant',
  'incrementStart',
];

export const stubTick = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new Tick(props);
};

export const stubValidTick = props => stubTick({
  user: stubValidUser(),
  incrementStart: minutesAgo(1),
  assistant: stubValidAssistant(),
  ...props,
});

export const stubValidTickWithNotifications = (startTimes) => {
  const user = stubValidUser();
  const events = startTimes.map(t => stubValidCalendarEventWithNotification({
      user,
      owner: user,
      startTime: t,
      description: `Notification at ${t}`,
    }));
  user.events = events;
  return stubValidTick({ user });
};
