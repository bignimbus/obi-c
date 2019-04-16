const isAlphanumeric = char => /A-Za-z0-9/.test(char);

class Plugin {
  constructor ({
    user,
    rawText,
    assistant,
  }) {
    Object.assign(this, {
      user,
      rawText,
      assistant,
    });
    return this;
  }
}

export default Plugin;

