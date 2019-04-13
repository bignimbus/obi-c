import React, { useContext } from 'react';
import renderer, { act } from 'react-test-renderer';
import { advanceTo, clear } from 'jest-date-mock';
import ClockContext, { ClockContextProvider } from '.';
import { minutesAgo } from '../../lib/Tick/__stubs__';
import User from '../../lib/User';

const renderComponentWithContext = Child => renderer.create(
  <ClockContextProvider>
    <Child />
  </ClockContextProvider>,
);

describe('ClockContextProvider', () => {
  it('should expose a collection of notifications', () => {
    const TestComponent = () => {
      const { activeNotifications } = useContext(ClockContext);
      return <div>{ JSON.stringify(activeNotifications) } </div>;
    };
    const component = renderComponentWithContext(TestComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should expose a function to add an event', () => {
    const spy = jest.spyOn(User.prototype, 'addEvent');
    const TestComponent = () => {
      const { addEvent } = useContext(ClockContext);
      const handleClick = () => {
        addEvent({
          description: 'Fake event',
          startTime: minutesAgo(-10),
        });
      };
      return (
        <button onClick={handleClick}>
          Add event
        </button>
      );
    };
    const component = renderComponentWithContext(TestComponent);
    component.root.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should expose a function to remove an event', () => {
    const spy = jest.spyOn(User.prototype, 'removeEvent');
    const TestComponent = () => {
      const { removeEvent } = useContext(ClockContext);
      const handleClick = () => {
        removeEvent({
          description: 'Fake event',
          startTime: minutesAgo(10),
        });
      };
      return (
        <button onClick={handleClick}>
          Remove event
        </button>
      );
    };
    const component = renderComponentWithContext(TestComponent);
    component.root.findByType('button').props.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should tick the clock every 15 seconds', async () => {
    jest.useFakeTimers();

    const TestComponent = () => {
      const { addEvent, activeNotifications } = useContext(ClockContext);

      const handleClick = (props) => {
        addEvent(props);
      };

      return (
        <div>
          <ul>
            {
              activeNotifications.map((n, i) => (
                <li key={i}>{ n.body }</li>
              ))
            }
          </ul>
          <button onClick={handleClick}>
            Add event
          </button>
        </div>
      );
    };
    const component = renderComponentWithContext(TestComponent);
    const { onClick } = component.root.findByType('button').props;
    onClick({ description: 'active right away', startTime: minutesAgo(2) });
    onClick({ description: 'active right away again', startTime: minutesAgo(1) });
    onClick({ description: 'active in a minute', startTime: minutesAgo(-1) });
    onClick({ description: 'active in an hour', startTime: minutesAgo(-60) });
    act(() => {
      advanceTo(minutesAgo(-16 / 60));
      jest.advanceTimersByTime(16 * 1000);
    });
    expect(component.toJSON()).toMatchSnapshot();
    act(() => {
      advanceTo(minutesAgo(-1));
      jest.advanceTimersByTime(60 * 1000);
    });
    expect(component.toJSON()).toMatchSnapshot();
    act(() => {
      advanceTo(minutesAgo(-60));
      jest.advanceTimersByTime(60 * 60 * 1000);
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
  clear();
});
