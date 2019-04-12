import {
  stubValidAppNotification,
  stubAppNotificationWithInvalidBody,
  stubAppNotificationWithInvalidTime,
  stubAppNotificationWithInvalidTitle,
} from './__stubs__';

describe('AppNotification', () => {
  it('should allow a title to be assigned', () => {
    const title = 'Title';
    const appNotification = stubValidAppNotification({ title });
    expect(appNotification.title).toBe(title);
    expect(appNotification.errors.size).toBe(0);
  });

  it('should not allow a blank title', () => {
    const appNotification = stubAppNotificationWithInvalidTitle();
    const { errors } = appNotification;
    expect(errors.size).toBe(1);
    const [appNotificationError] = [...errors.values()];
    expect(appNotificationError).toEqual(new Error('an app notification must have a title'));
  });

  it('should allow a body to be assigned', () => {
    const body = 'This is a notification body';
    const appNotification = stubValidAppNotification({ body });
    expect(appNotification.errors.size).toBe(0);
    expect(appNotification.body).toBe(body);
  });

  it('should not allow a blank body', () => {
    const appNotification = stubAppNotificationWithInvalidBody();
    const { errors } = appNotification;
    expect(errors.size).toBe(1);
    const [appNotificationError] = [...errors.values()];
    expect(appNotificationError).toEqual(new Error('an app notification must have a body'));
  });

  it('should allow a time to be assigned', () => {
    const time = new Date();
    const appNotification = stubValidAppNotification({ time });
    expect(appNotification.errors.size).toBe(0);
    expect(appNotification.time).toBe(time);
  });

  it('should not allow a blank time', () => {
    const appNotification = stubAppNotificationWithInvalidTime();
    const { errors } = appNotification;
    expect(errors.size).toBe(1);
    const [appNotificationError] = [...errors.values()];
    expect(appNotificationError).toEqual(new Error('an app notification must have a time'));
  });

  it('should allow a notifiable entity to be assigned', () => {
    const notifiable = {};
    const appNotification = stubValidAppNotification({ notifiable });
    expect(appNotification.errors.size).toBe(0);
    expect(appNotification.notifiable).toBe(notifiable);
  });
});
