import Plugin from './Plugin';
import { stubValidUser } from '../lib/User/__stubs__';
import { stubValidAssistant } from '../lib/Assistant/__stubs__';

describe('Plugin', () => {
  it('should be able to assign a user property', () => {
    const user = stubValidUser();
    const plugin = new Plugin({ user });
    expect(plugin.user).toBe(user);
  });

  it('should be able to assign a rawText property', () => {
    const rawText = 'Lorem ipsum';
    const plugin = new Plugin({ rawText });
    expect(plugin.rawText).toBe(rawText);
  });

  it('should be able to assign an assistant property', () => {
    const assistant = stubValidAssistant();
    const plugin = new Plugin({ assistant });
    expect(plugin.assistant).toBe(assistant);
  });
});

