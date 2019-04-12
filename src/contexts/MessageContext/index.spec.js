import React, { useContext } from 'react';
import renderer, { act } from 'react-test-renderer';
import MessageContext, { MessageContextProvider } from '.';

const renderComponentWithContext = Child => renderer.create(
  <MessageContextProvider>
    <Child />
  </MessageContextProvider>,
);

describe('MessageContextProvider', () => {
  it('should provide a context', () => {
    const TestChildComponent = ({ testValue }) => <div>{ JSON.stringify(testValue.messages) }</div>;
    const TestComponent = () => {
      const contextValue = useContext(MessageContext);
      return <TestChildComponent testValue={contextValue} />;
    };
    const element = renderComponentWithContext(TestComponent);
    const instance = element.root.findByType(TestChildComponent);
    const { messages, enqueueMessage, dequeueMessage } = instance.props.testValue;
    expect(messages).toEqual([]);
    expect(element.toJSON()).toMatchSnapshot();
    const stubMessage = { foo: 'bar' };
    act(() => {
      enqueueMessage(stubMessage);
    });
    expect(element.toJSON()).toMatchSnapshot();
    act(() => {
      dequeueMessage(stubMessage);
    });
    expect(element.toJSON()).toMatchSnapshot();
  });
});
