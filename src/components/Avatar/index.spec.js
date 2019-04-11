import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '.';

const renderComponent = props => renderer.create(
  <Avatar />,
);

describe('Avatar', () => {
  test('default', () => {
    const element = renderComponent();
    expect(element.toJSON()).toMatchSnapshot();
  });
});
