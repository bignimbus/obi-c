import React, { useContext } from 'react';
import renderer from 'react-test-renderer';
import BlockstackContext, { BlockstackContextProvider } from '.';

const renderComponentWithContext = Child => renderer.create(
  <BlockstackContextProvider>
    <Child />
  </BlockstackContextProvider>
);

describe('BlockstackContextProvider', () => {
  it('should provide a context', () => {
    const TestChildComponent = () => <div />;
    const TestComponent = () => {
      const contextValue = useContext(BlockstackContext);
      return <TestChildComponent testValue={contextValue} />;
    };
    const element = renderComponentWithContext(TestComponent);
    const instance = element.root.findByType(TestChildComponent);
    const { user, signIn, signOut, authState } = instance.props.testValue;
    expect(user).toBeDefined();
    expect(authState).toBe('pending');
    expect(signIn).toBeInstanceOf(Function);
    expect(signOut).toBeInstanceOf(Function);
  });
});
