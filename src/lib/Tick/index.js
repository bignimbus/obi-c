import Model from '../Model';

class Tick extends Model {
  init({
    user,
    assistant,
    incrementStart,
  }) {
    Object.assign(this, {
      user,
      assistant,
      incrementStart,
      incrementEnd: new Date(),
    });
  }

  getActiveNotifications () {
    return this.user.events.reduce((activeNotifications, { notifications }) => [
      ...activeNotifications,
      ...notifications.filter(
        ({ time }) => time <= this.incrementEnd
      ),
    ], []);
  }
}

export default Tick;
