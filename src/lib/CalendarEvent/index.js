import Model from '../Model';

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
    this.errors = 'an event must have a start time';
  }
}

export default CalendarEvent;
