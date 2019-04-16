const isAlphanumeric = char => /A-Za-z0-9/.test(char);

class Plugin {
  constructor ({
    rawText,
    addEvent,
  }) {
    Object.assign(this, {
      rawText,
      addEvent,
    });
    return this;
  }
}

export default Plugin;

