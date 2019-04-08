import Model from '../Model';

class User extends Model {
  init ({
    id,
    name,
  }) {
    Object.assign(this, { id, name });
  }
}

export default User;
