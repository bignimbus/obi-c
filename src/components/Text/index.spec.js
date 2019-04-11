import React from 'react';
import renderer from 'react-test-renderer';
import Text from '.';

const renderComponent = props => renderer.create(
  <Text {...props}>
    Lorem ipsum
  </Text>,
);

describe('Text', () => {
  test('default', () => {
    const element = renderComponent();
    expect(element.toJSON()).toMatchSnapshot();
  });

  test('with specified size prop', () => {
    const element = renderComponent({ size: 'md' });
    expect(element.toJSON()).toMatchSnapshot();
  });

  test('inverted', () => {
    const element = renderComponent({ inverted: true });
    expect(element.toJSON()).toMatchSnapshot();
  });

  test('inverted-darker', () => {
    const element = renderComponent({ invertedDark: true });
    expect(element.toJSON()).toMatchSnapshot();
  });
});
