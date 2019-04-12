import { stubUser } from '../User/__stubs__';
import { stubValidAppNotification } from '../AppNotification/__stubs__';
import {
  stubValidCalendarEvent,
  stubCalendarEventWithInvalidDate,
  stubCalendarEventWithInvalidUser,
  stubCalendarEventWithInvalidOwner,
  stubCalendarEventWithInvalidNotifications,
} from './__stubs__';

describe('CalendarEvent', () => {
  it('should allow a start time to be assigned', () => {
    const startTime = new Date();
    const calendarEvent = stubValidCalendarEvent({ startTime });
    expect(calendarEvent.startTime).toBe(startTime);
  });

  it('should allow an end time to be assigned', () => {
    const endTime = new Date();
    const calendarEvent = stubValidCalendarEvent({ endTime });
    expect(calendarEvent.endTime).toBe(endTime);
  });

  it('should allow a description to be assigned', () => {
    const description = 'Foo bar';
    const calendarEvent = stubValidCalendarEvent({ description });
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

  it('should allow a user to be assigned', () => {
    const user = stubUser({ name: 'Name' });
    const calendarEvent = stubValidCalendarEvent({ user });
    expect(calendarEvent.user).toBe(user);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should validate the user', () => {
    const calendarEvent = stubCalendarEventWithInvalidUser();
    const { errors } = calendarEvent;
    expect(errors.size).toBe(1);
    const [userIdError] = [...errors.values()];
    expect(userIdError).toEqual(new Error('an event must have a user'));
  });

  it('should allow an owner to be assigned', () => {
    const owner = stubUser({ name: 'Owner' });
    const calendarEvent = stubValidCalendarEvent({ owner });
    expect(calendarEvent.owner).toBe(owner);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should validate the owner', () => {
    const calendarEvent = stubCalendarEventWithInvalidOwner();
    const { errors } = calendarEvent;
    expect(errors.size).toBe(1);
    const [ownerIdError] = [...errors.values()];
    expect(ownerIdError).toEqual(new Error('an event must have an owner'));
  });

  it('should allow a collection of notifications to be assigned', () => {
    const notifications = [stubValidAppNotification()];
    const calendarEvent = stubValidCalendarEvent({ notifications });
    expect(calendarEvent.notifications).not.toBe(notifications);
    expect(calendarEvent.notifications).toEqual(notifications);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should allow the collection of notifications to be empty', () => {
    const notifications = [];
    const calendarEvent = stubValidCalendarEvent({ notifications });
    expect(calendarEvent.notifications).not.toBe(notifications);
    expect(calendarEvent.notifications).toEqual(notifications);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should default the notifications collection to an empty array', () => {
    const notifications = null;
    const calendarEvent = stubValidCalendarEvent({ notifications });
    expect(calendarEvent.notifications).toEqual([]);
    expect(calendarEvent.errors.size).toBe(0);
  });

  it('should validate the type of each notification', () => {
    const calendarEvent = stubCalendarEventWithInvalidNotifications();
    const { errors } = calendarEvent;
    expect(errors.size).toBe(1);
    const [ownerIdError] = [...errors.values()];
    expect(ownerIdError).toEqual(new Error('notifications must be of type AppNotification'));
  });

  it('should be able to add a notification', () => {
    const calendarEvent = stubValidCalendarEvent();
    const time = new Date();
    calendarEvent.addNotification({
      time,
      title: 'Fake Title',
      body: 'Notification body',
    });
    expect(calendarEvent.notifications[0]).toEqual({
      time,
      title: 'Fake Title',
      body: 'Notification body',
      notifiable: calendarEvent,
    });
  });

  it('should default the notification time property to the value of startTime', () => {
    const calendarEvent = stubValidCalendarEvent();
    calendarEvent.addNotification({
      title: 'Fake Title',
      body: 'Notification body',
    });
    expect(calendarEvent.notifications[0]).toEqual({
      title: 'Fake Title',
      body: 'Notification body',
      notifiable: calendarEvent,
      time: calendarEvent.startTime,
    });
  });

  it('should be able to remove a notification', () => {
    const notification = stubValidAppNotification();
    const calendarEvent = stubValidCalendarEvent({ notifications: [notification] });
    notification.notifiable = calendarEvent;
    expect(calendarEvent.notifications[0]).toBe(notification);
    calendarEvent.removeNotfication(notification);
    expect(calendarEvent.notifications.length).toBe(0);
    expect(notification.notifiable).toBeNull();
  });
});
