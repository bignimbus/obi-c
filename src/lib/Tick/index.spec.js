import { stubValidUser } from '../User/__stubs__';
import { stubValidAssistant } from '../Assistant/__stubs__';
import {
  minutesAgo,
  stubValidTick,
  stubValidTickWithNotifications,
} from './__stubs__';

describe('Tick', () => {
  it('should be able to assign a user', () => {
    const user = stubValidUser();
    const tick = stubValidTick({ user });
    expect(tick.user).toBe(user);
  });

  it('should be able to assign an assistant', () => {
    const assistant = stubValidAssistant();
    const tick = stubValidTick({ assistant });
    expect(tick.assistant).toBe(assistant);
  });

  it('should be able to assign an incrementStart time', () => {
    const incrementStart = new Date();
    const tick = stubValidTick({ incrementStart });
    expect(tick.incrementStart).toBe(incrementStart);
  });

  it('should set an incrementEnd attribute on itself equal to the current time', () => {
    const rightBeforeTickInstance = new Date();
    const tick = stubValidTick();
    const rightAfterTickInstance = new Date();
    expect(tick.incrementEnd >= rightBeforeTickInstance).toBe(true);
    expect(tick.incrementEnd <= rightAfterTickInstance).toBe(true);
  });

  it('should be able to return a collection of "active" notifications', () => {
    const activeNotifications = [
      minutesAgo(60),
      minutesAgo(30),
      minutesAgo(11),
      minutesAgo(10),
      minutesAgo(9.99),
      minutesAgo(9),
      minutesAgo(1),
    ];
    const inactiveNotifications = [
      minutesAgo(-1),
    ];
    const tick = stubValidTickWithNotifications([...activeNotifications, ...inactiveNotifications]);
    tick.incrementStart = minutesAgo(10);
    const results = tick.getActiveNotifications();
    expect(results).toHaveLength(activeNotifications.length);
    expect(results.map(({ time }) => time)).toEqual(activeNotifications);
  });
})
