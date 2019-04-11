import React from 'react';
import renderer from 'react-test-renderer';
import AvatarGrid from '.';

const renderComponent = props => renderer.create(
  <AvatarGrid {...props} />,
);

describe('AvatarGrid', () => {
  test('default', () => {
    const element = renderComponent();
    expect(element.toJSON()).toMatchSnapshot();
  });
});
