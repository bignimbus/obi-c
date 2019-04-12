import Model from '../Model';

class User extends Model {
  init ({
    name,
  }) {
    Object.assign(this, { name });
  }
}

export default User;
