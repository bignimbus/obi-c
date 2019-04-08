import User from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'id',
  'name',
];

export const stubUser = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new User(props);
};
