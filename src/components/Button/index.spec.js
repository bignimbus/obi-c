import React from 'react';
import renderer from 'react-test-renderer';
import Button from '.';

describe('Button', () => {
  it('should render a button with content and require an onClick event handler', () => {
    const fn = jest.fn();
    const element = renderer.create(
      <Button onClick={fn}>Click me</Button>,
    );
    element.root.findByType('button').props.onClick();
    expect(fn).toHaveBeenCalled();
    expect(element.toJSON()).toMatchSnapshot();
  });

  it('should be able to be disabled', () => {
    const fn = jest.fn();
    const element = renderer.create(
      <Button disabled onClick={fn}>Don't click me</Button>,
    );
    expect(element.toJSON()).toMatchSnapshot();
  });
});
