import AppNotification from '../';
import difference from 'lodash/difference';

const VALID_PROPS = [
  'body',
  'time',
  'title',
  'notifiable',
];

export const stubAppNotification = (props) => {
  const propKeys = Object.keys(props);
  const unrecognizedKeys = difference(propKeys, VALID_PROPS);
  if (unrecognizedKeys.length) {
    throw new Error(`invalid props: ${unrecognizedKeys.join(', ')}`);
  }
  return new AppNotification(props);
};

export const stubValidAppNotification = props => stubAppNotification({
  body: 'Bar',
  title: 'Foo',
  time: new Date(),
  notifiable: {},
  ...props,
});

export const stubAppNotificationWithInvalidBody = props => stubValidAppNotification({
  body: null,
  ...props,
});

export const stubAppNotificationWithInvalidTitle = props => stubValidAppNotification({
  title: null,
  ...props,
});

export const stubAppNotificationWithInvalidTime = props => stubValidAppNotification({
  time: null,
  ...props,
});
