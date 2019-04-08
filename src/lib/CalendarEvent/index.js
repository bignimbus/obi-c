import Model from '../Model';

const START_TIME_ERROR_MESSAGE = 'an event must have a start time';
const USER_ID_ERROR_MESSAGE = 'an event must have a user id';
const OWNER_ID_ERROR_MESSAGE = 'an event must have an owner id';

class CalendarEvent extends Model {
  init ({
    userId,
    ownerId,
    endTime,
    startTime,
    description,
  }) {
    Object.assign(this, {
      userId,
      ownerId,
      endTime,
      startTime,
      description,
    });
    this.validateStartTime();
    this.validateUserId();
    this.validateOwnerId();
  }

  validateStartTime () {
    if (this.startTime instanceof Date) return;
    this.errors = START_TIME_ERROR_MESSAGE;
  }

  validateUserId () {
    if (this.userId) return;
    this.errors = USER_ID_ERROR_MESSAGE;
  }

  validateOwnerId () {
    if (this.ownerId) return;
    this.errors = OWNER_ID_ERROR_MESSAGE;
  }
}

export default CalendarEvent;
