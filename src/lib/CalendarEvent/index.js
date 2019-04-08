import Model from '../Model';

const START_TIME_ERROR_MESSAGE = 'an event must have a start time';

class CalendarEvent extends Model {

  init ({
    endTime,
    startTime,
    description,
  }) {
    Object.assign(this, {
      endTime,
      startTime,
      description,
    });
    this.validateStartTime();
  }

  validateStartTime () {
    if (this.startTime instanceof Date) return;
    this.errors = START_TIME_ERROR_MESSAGE;
  }
}

export default CalendarEvent;
