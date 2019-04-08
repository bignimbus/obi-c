import CalendarEvent from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
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

export const stubValidCalendarEvent = () => stubCalendarEvent({
  endTime: new Date(),
  startTime: new Date(),
  description: 'A valid calendar event',
});

export const stubCalendarEventWithInvalidDate = () => stubCalendarEvent({
  endTime: null,
  startTime: null,
  description: null,
});
