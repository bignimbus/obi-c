import Model from '../Model';
import User from '../User';
import AppNotification from '../AppNotification';

const START_TIME_ERROR_MESSAGE = 'an event must have a start time';
const USER_ERROR_MESSAGE = 'an event must have a user';
const OWNER_ERROR_MESSAGE = 'an event must have an owner';
const NOTIFICATIONS_ERROR_MESSAGE = 'notifications must be of type AppNotification';

class CalendarEvent extends Model {
  init ({
    user,
    owner,
    endTime,
    startTime,
    description,
    notifications,
  }) {
    Object.assign(this, {
      user,
      owner,
      endTime,
      startTime,
      description,
      notifications: [].concat(notifications).filter(el => el),
    });
    this.validateStartTime();
    this.validateUser();
    this.validateOwner();
    this.validateNotifications();
  }

  validateStartTime () {
    if (this.startTime instanceof Date) return;
    this.errors = START_TIME_ERROR_MESSAGE;
  }

  validateUser () {
    if (this.user instanceof User) return;
    this.errors = USER_ERROR_MESSAGE;
  }

  validateOwner () {
    if (this.owner instanceof User) return;
    this.errors = OWNER_ERROR_MESSAGE;
  }

  validateNotifications () {
    if (this.notifications.every(n => n instanceof AppNotification)) return;
    this.errors = NOTIFICATIONS_ERROR_MESSAGE;
  }

  addNotification ({ body, time, title }) {
    const notification = new AppNotification({
      body,
      title,
      notifiable: this,
      time: time || this.startTime,
    });
    this.notifications = [...this.notifications, notification];
    return this;
  }

  removeNotfication (notification) {
    this.notifications = this.notifications.filter(n => n !== notification);
    notification.notifiable = null;
    return this;
  }
}

export default CalendarEvent;
