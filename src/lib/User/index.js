import Model from '../Model';
import CalendarEvent from '../CalendarEvent';

const DEFAULT_EVENT_TITLE = 'Reminder';
const EVENTS_ERROR_MESSAGE = 'events must be instances of CalendarEvent';

class User extends Model {
  init ({
    name,
    events = [],
  }) {
    Object.assign(this, {
      name,
      events: [].concat(events).filter(e => e),
    });
    this.validateEvents();
  }

  validateEvents () {
    if (this.events.every(e => e instanceof CalendarEvent)) return;
    this.errors = EVENTS_ERROR_MESSAGE;
  }

  addEvent ({
    startTime,
    description,
  }) {
    const event = new CalendarEvent({
      startTime,
      user: this,
      owner: this,
      description,
    });
    event.addNotification({
      body: description,
      title: DEFAULT_EVENT_TITLE,
    });
    this.events = [...this.events, event];
    return this;
  }

  removeEvent (event) {
    this.events = this.events.filter(e => e !== event);
    event.user = null;
    event.owner = null;
    return this;
  }
}

export default User;
