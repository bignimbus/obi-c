import { parse } from 'chrono-node';
import Plugin from '../Plugin';

const NAME = 'Set reminder';

class Remind extends Plugin {
  getPreProcessedText () {
    const { rawText } = this;
    const match = [
      /^remind\s+me(\s+to)?/i,
      /^reminder(\s+to)?/i,
      /^remind/i,
    ]
      .map(regex => rawText.match(regex))
      .filter(hasMatch => hasMatch)[0];
    return match ? [
        {
          text: match[0],
          command: NAME,
        }, {
          command: false,
          text: rawText.slice(match[0].length),
        }
      ] : [
        { command: false, text: rawText },
      ]
  }

  execute () {
    const textToParse = this.getPreProcessedText()
      .filter(node => !node.command)
      .map(({ text }) => text)
      .join('');
    const [result] = parse(textToParse);
    if (!result) {
      this.error = new Error("I couldn't set a reminder because I didn't find any dates or times in your message");
      return false;
    }
    const { text, start } = result;
    this.addEvent({
      startTime: start.date(),
      description: textToParse.replace(text, '').trim(),
    });
    return true;
  }
}

export default Remind;
