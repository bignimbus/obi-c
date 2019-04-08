import CalendarEvent from '.';

describe('CalendarEvent', () => {
  it('should allow a start time to be assigned', () => {
    const startTime = new Date();
    const calendarEvent = new CalendarEvent({ startTime });
    expect(calendarEvent.startTime).toBe(startTime);
  });

  it('should allow an end time to be assigned', () => {
    const endTime = new Date();
    const calendarEvent = new CalendarEvent({ endTime });
    expect(calendarEvent.endTime).toBe(endTime);
  });

  it('should allow a description to be assigned', () => {
    const description = 'Foo bar';
    const calendarEvent = new CalendarEvent({ description });
    expect(calendarEvent.description).toBe('Foo bar');
  });

  it('should not allow a blank value for a start time', () => {
    const startTime = null;
    const calendarEvent = new CalendarEvent({ startTime });
    expect(calendarEvent.startTime).toBeNull();
    expect(calendarEvent.errors.size).toBe(1);
    const [startTimeError] = [...calendarEvent.errors.values()];
    expect(startTimeError).toEqual(new Error('an event must have a start time'));
  });

  it('should allow a blank description', () => {
    const startTime = new Date();
    const description = null;
    const calendarEvent = new CalendarEvent({ startTime, description });
    expect(calendarEvent.description).toBeNull();
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should allow a blank end time', () => {
    const startTime = new Date();
    const endTime = null;
    const calendarEvent = new CalendarEvent({ startTime, endTime });
    expect(calendarEvent.endTime).toBeNull();
    expect(calendarEvent.errors.size).toBe(0);
  });
});
