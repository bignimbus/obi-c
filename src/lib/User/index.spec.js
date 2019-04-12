import { stubValidUser } from './__stubs__';
import { stubValidCalendarEvent } from '../CalendarEvent/__stubs__';

describe('User', () => {
  it('should allow the assignment of a name', () => {
    const name = 'Foo';
    const user = stubValidUser({ name });
    expect(user.name).toBe(name);
  });

  it('should allow the assignment of events', () => {
    const event = stubValidCalendarEvent();
    const events = [event];
    const user = stubValidUser({ events });
    expect(user.events).not.toBe(events);
    expect(user.events).toEqual(events);
    expect(user.errors.size).toBe(0);
  });

  it('should default the events property to an empty array', () => {
    const user = stubValidUser({ events: undefined });
    expect(user.events).toEqual([]);
    expect(user.errors.size).toBe(0);
  });

  it('should validate the type of events', () => {
    const events = [{}];
    const user = stubValidUser({ events });
    expect(user.errors.size).toBe(1);
    const [userError] = user.errors;
    expect(userError).toEqual(new Error('events must be instances of CalendarEvent'));
  });

  it('should allow the addition of a calendar event', () => {
    const user = stubValidUser();
    const startTime = new Date();
    const description = 'My notification description';
    user.addEvent({
      startTime,
      description,
    });
    expect(user.events.length).toBe(1);
    const [event] = user.events;
    expect(event.user).toBe(user);
    expect(event.owner).toBe(user);
    expect(event.startTime).toBe(startTime);
    expect(event.description).toBe(description);
    expect(event.notifications.length).toBe(1);
    const [notification] = event.notifications;
    expect(notification.notifiable).toBe(event);
    expect(notification.title).toBe('Reminder');
    expect(notification.body).toBe(description);
  });

  it('should allow the removal of a calendar event', () => {
    const user = stubValidUser();
    const startTime = new Date();
    const description = 'My notification description';
    user.addEvent({
      startTime,
      description,
    });
    expect(user.events.length).toBe(1);
    const [event] = user.events;
    expect(event.user).toBe(user);
    expect(event.owner).toBe(user);
    user.removeEvent(event);
    expect(user.events.length).toBe(0);
    expect(event.user).toBeNull();
    expect(event.owner).toBeNull();
  });
});
