import Model from '../Model';

const TITLE_ERROR_MESSAGE = 'an app notification must have a title';
const BODY_ERROR_MESSAGE = 'an app notification must have a body';
const TIME_ERROR_MESSAGE = 'an app notification must have a time';

class AppNotification extends Model {
  init({
    body,
    time,
    title,
    notifiable,
  }) {
    Object.assign(this, {
      body,
      time,
      title,
      notifiable,
    });
    this.validateTitle();
    this.validateBody();
    this.validateTime();
  }

  validateTitle () {
    if (this.title) return;
    this.errors = TITLE_ERROR_MESSAGE;
  }

  validateBody () {
    if (this.body) return;
    this.errors = BODY_ERROR_MESSAGE;
  }

  validateTime () {
    if (this.time instanceof Date) return;
    this.errors = TIME_ERROR_MESSAGE;
  }
}

export default AppNotification;
