import CalendarEvent from '../';

export const stubValidCalendarEvent = () => new CalendarEvent({
  endTime: new Date(),
  startTime: new Date(),
  description: 'A valid calendar event',
});

export const stubCalendarEventWithInvalidDate = () => new CalendarEvent({
  endTime: null,
  startTime: null,
  description: null,
});
