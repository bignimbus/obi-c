import CalendarEvent from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'userId',
  'ownerId',
  'endTime',
  'startTime',
  'description',
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
  userId: '42',
  ownerId: '42',
  endTime: new Date(),
  startTime: new Date(),
  description: 'A valid calendar event',
  ...props,
});

export const stubCalendarEventWithInvalidDate = props => stubValidCalendarEvent({
  startTime: null,
  ...props,
});

export const stubCalendarEventWithInvalidUserId = props => stubValidCalendarEvent({
  userId: null,
  ...props,
});

export const stubCalendarEventWithInvalidOwnerId = props => stubValidCalendarEvent({
  ownerId: null,
  ...props,
});
