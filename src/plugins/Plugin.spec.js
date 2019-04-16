import Plugin from './Plugin';
import { stubValidUser } from '../lib/User/__stubs__';

describe('Plugin', () => {
  it('should be able to assign an addEvent property', () => {
    const { addEvent } = stubValidUser();
    const plugin = new Plugin({ addEvent });
    expect(plugin.addEvent).toBe(addEvent);
  });

  it('should be able to assign a rawText property', () => {
    const rawText = 'Lorem ipsum';
    const plugin = new Plugin({ rawText });
    expect(plugin.rawText).toBe(rawText);
  });
});

