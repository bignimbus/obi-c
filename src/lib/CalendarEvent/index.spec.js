import {
  stubCalendarEvent,
  stubValidCalendarEvent,
  stubCalendarEventWithInvalidDate,
  stubCalendarEventWithInvalidUserId,
  stubCalendarEventWithInvalidOwnerId,
} from './__stubs__';

describe('CalendarEvent', () => {
  it('should allow a start time to be assigned', () => {
    const startTime = new Date();
    const calendarEvent = stubCalendarEvent({ startTime });
    expect(calendarEvent.startTime).toBe(startTime);
  });

  it('should allow an end time to be assigned', () => {
    const endTime = new Date();
    const calendarEvent = stubCalendarEvent({ endTime });
    expect(calendarEvent.endTime).toBe(endTime);
  });

  it('should allow a description to be assigned', () => {
    const description = 'Foo bar';
    const calendarEvent = stubCalendarEvent({ description });
    expect(calendarEvent.description).toBe('Foo bar');
  });

  it('should not allow a blank value for a start time', () => {
    const calendarEvent = stubCalendarEventWithInvalidDate();
    expect(calendarEvent.startTime).toBeFalsy();
    expect(calendarEvent.errors.size).toBe(1);
    const [startTimeError] = [...calendarEvent.errors.values()];
    expect(startTimeError).toEqual(new Error('an event must have a start time'));
  });

  it('should allow a blank description', () => {
    const startTime = new Date();
    const description = null;
    const calendarEvent = stubValidCalendarEvent({ startTime, description });
    expect(calendarEvent.description).toBeNull();
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should allow a blank end time', () => {
    const startTime = new Date();
    const endTime = null;
    const calendarEvent = stubValidCalendarEvent({ startTime, endTime });
    expect(calendarEvent.endTime).toBeNull();
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should allow a user id to be assigned', () => {
    const userId = '1';
    const calendarEvent = stubValidCalendarEvent({ userId });
    expect(calendarEvent.userId).toBe(userId);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should validate the existence of a user id', () => {
    const calendarEvent = stubCalendarEventWithInvalidUserId();
    const { errors } = calendarEvent;
    expect(errors.size).toBe(1);
    const [userIdError] = [...errors.values()];
    expect(userIdError).toEqual(new Error('an event must have a user id'));
  });

  it('should allow an owner id to be assigned', () => {
    const ownerId = '2';
    const calendarEvent = stubValidCalendarEvent({ ownerId });
    expect(calendarEvent.ownerId).toBe('2');
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should validate the existence of an owner id', () => {
    const calendarEvent = stubCalendarEventWithInvalidOwnerId();
    const { errors } = calendarEvent;
    expect(errors.size).toBe(1);
    const [ownerIdError] = [...errors.values()];
    expect(ownerIdError).toEqual(new Error('an event must have an owner id'));
  });
});
