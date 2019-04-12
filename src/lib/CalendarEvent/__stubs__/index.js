import CalendarEvent from '../';
import { stubUser } from '../../User/__stubs__';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'user',
  'owner',
  'endTime',
  'startTime',
  'description',
  'notifications',
];

export const stubCalendarEvent = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new CalendarEvent(props);
};

export const stubValidCalendarEvent = props => stubCalendarEvent({
  notifications: [],
  endTime: new Date(),
  startTime: new Date(),
  user: stubUser({ name: 'Foo' }),
  owner: stubUser({ name: 'Foo' }),
  description: 'A valid calendar event',
  ...props,
});

export const stubCalendarEventWithInvalidDate = props => stubValidCalendarEvent({
  startTime: null,
  ...props,
});

export const stubCalendarEventWithInvalidUser = props => stubValidCalendarEvent({
  user: undefined,
  ...props,
});

export const stubCalendarEventWithInvalidOwner = props => stubValidCalendarEvent({
  owner: undefined,
  ...props,
});

export const stubCalendarEventWithInvalidNotifications = props => stubValidCalendarEvent({
  notifications: [{}],
  ...props,
});
