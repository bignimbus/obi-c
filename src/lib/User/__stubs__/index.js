import User from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'name',
  'events',
];

export const stubUser = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new User(props);
};

export const stubValidUser = props => new User({
  name: 'Name',
  events: [],
  ...props,
});
