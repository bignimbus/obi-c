// Generic, not to be used directly
class Model {
  constructor (args) {
    Object.defineProperty(this, '_errors', {
      value: new Set(),
      writeable: false,
    });
    this.init(args);
    return this;
  }

  get errors () {
    return this._errors;
  }

  set errors (errorMessage) {
    this._errors.add(new Error(errorMessage));
  }
}

export default Model;
