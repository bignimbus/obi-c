import React from 'react';
import renderer from 'react-test-renderer';
import Messages from '.';
import ClockContext from '../../contexts/ClockContext';

const removeEvent = jest.fn();

const renderComponent = activeNotifications => renderer.create(
  <ClockContext.Provider
    value={{
      removeEvent,
      activeNotifications,
    }}
  >
    <Messages />
  </ClockContext.Provider>,
);

describe('Messages', () => {
  it('should be able to render with no active notifications', () => {
    const element = renderComponent([]);
    expect(element.toJSON()).toMatchSnapshot();
  });

  it('should be able to render with active notifications', () => {
    const activeNotifications = [
      { title: 'Foo', body: 'bar baz', notifiable: 'I am a fake event' },
    ];
    const element = renderComponent(activeNotifications);
    expect(element.toJSON()).toMatchSnapshot();
  });
});
