import Remind from '.';
import { stubValidUser } from '../../lib/User/__stubs__';
import { stubValidAssistant } from '../../lib/Assistant/__stubs__';

describe('Remind plugin', () => {
  it('should be able to process text that starts with "remind me to" as a command', () => {
    expect(
      new Remind({
        rawText: 'remind me to check in to my flight at 6:00 am',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: 'Set reminder',
        text: 'remind me to',
      }, {
        command: false,
        text: ' check in to my flight at 6:00 am',
      },
    ]);
  });

  it('should be able to process text that starts with "remind me" as a command', () => {
    expect(
      new Remind({
        rawText: 'remind me check in to my flight at 6:00 am',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: 'Set reminder',
        text: 'remind me',
      }, {
        command: false,
        text: ' check in to my flight at 6:00 am',
      },
    ]);
  });

  it('should be able to process text that starts with "reminder to" as a command', () => {
    expect(
      new Remind({
        rawText: 'reminder to check in to my flight at 6:00 am',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: 'Set reminder',
        text: 'reminder to',
      }, {
        command: false,
        text: ' check in to my flight at 6:00 am',
      },
    ]);
  });

  it('should be able to process text that starts with "reminder" as a command', () => {
    expect(
      new Remind({
        rawText: 'reminder check in to my flight at 6:00 am',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: 'Set reminder',
        text: 'reminder',
      }, {
        command: false,
        text: ' check in to my flight at 6:00 am',
      },
    ]);
  });

  it('should be able to process text that starts with "remind" as a command', () => {
    expect(
      new Remind({
        rawText: 'remind: check in to my flight at 6:00 am',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: 'Set reminder',
        text: 'remind',
      }, {
        command: false,
        text: ': check in to my flight at 6:00 am',
      },
    ]);
  });

  it('should not interpret mid-sentence usage as a command', () => {
    expect(
      new Remind({
        rawText: 'check in to my flight at 6:00 am as a reminder ok thanks bye',
      }).getPreProcessedText()
    ).toEqual([
      {
        command: false,
        text: 'check in to my flight at 6:00 am as a reminder ok thanks bye',
      },
    ]);
  });

  it('should be able to parse dates and times', () => {
    const user = stubValidUser();
    expect(user.events).toHaveLength(0);
    const remind = new Remind({
      addEvent: user.addEvent.bind(user),
      rawText: 'remind me to check in to my flight at 6:00 am',
    });
    expect(remind.execute()).toBe(true);
    const [event] = user.events;
    expect(event.description).toBe('check in to my flight');
    expect(event.startTime.getHours()).toBe(6);
    const [notification] = event.notifications;
    expect(notification.title).toBe('Reminder');
    expect(notification.body).toBe('check in to my flight');
    expect(notification.time.getHours()).toBe(6);
  });

  it('should set an error if there were no parse-able dates or times', () => {
    const user = stubValidUser();
    expect(user.events).toHaveLength(0);
    const remind = new Remind({
      addEvent: user.addEvent.bind(user),
      rawText: 'remind me that this is not a real thing',
    });
    expect(remind.execute()).toBe(false);
    expect(user.events).toHaveLength(0);
    expect(remind.error).toEqual(new Error("I couldn't set a reminder because I didn't find any dates or times in your message"));
  });
});
