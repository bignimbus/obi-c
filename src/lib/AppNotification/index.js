import Model from '../Model';

const TITLE_ERROR_MESSAGE = 'an app notification must have a title';
const BODY_ERROR_MESSAGE = 'an app notification must have a body';

class AppNotification extends Model {
  init({
    body,
    title,
  }) {
    Object.assign(this, { body, title });
    this.validateTitle();
    this.validateBody();
  }

  validateTitle () {
    if (this.title) return;
    this.errors = TITLE_ERROR_MESSAGE;
  }

  validateBody () {
    if (this.body) return;
    this.errors = BODY_ERROR_MESSAGE;
  }
}

export default AppNotification;
