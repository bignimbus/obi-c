import './index.css';
import React, { useState, useEffect, useContext } from 'react';
import Text from '../Text';
import Button from '../Button';
import ClockContext from '../../contexts/ClockContext';

const ONBOARDING_MESSAGES = [
  'Hello, there!  I am obi-c',
  'I am still a work-in-progress, but I can still do a thing or two',
  "Before we get to that, maybe you'd like to get to know me more",
  'I am kind of a cross between a Tamagotchi and a digital assistant',
  'When I am completed, you will be able to feed me',
  'You will also be able to play with me',
  'All of these things improve my mood and motivation',
  'So that I can remember to do the things I am supposed to do as your assistant',
  'Speaking of assistance, you can tap anywhere on the grid to bring up a menu',
  'You can see that I am designed to use the blockstack service',
  'This ensures that whatever we do here on your phone or computer',
  'Gets saved into your own, secure, personal data locker',
  'So that nothing gets forgotten on any of your devices',
  'This cloud functionality is still not implemented, so stay tuned',
  'You can also tell me to do things using the text box',
  "Right now I'm a modest assistant, I can only remind you to do things",
  'Try typing, "remind me to check obi-c in one minute"',
  'It was nice meeting you!',
];

const Messages = () => {
  const { removeEvent, activeNotifications } = useContext(ClockContext);
  const [onboardingMessages, setOnboardingMessages] = useState(
    ONBOARDING_MESSAGES.map(body => ({ body, title: 'Message', acknowledged: false })),
  );
  const [notifications, setNotifications] = useState([]);
  const messages = [
    ...onboardingMessages,
    ...[...notifications].sort((a, b) => a.notification.time < b.notification.time ? -1 : 1)
  ];

  useEffect(
    () => {
      const newNotifications = activeNotifications
        .filter(n => (
          !notifications
            .map(({ notification }) => notification)
            .includes(n)
          )
        );
      setNotifications(
        newNotifications.map(notification => ({
          notification,
          acknowledged: false,
          body: notification.body,
          title: notification.title,
        })),
      );
    },
    [activeNotifications],
  );

  return (
    <div
      className={`
        messages
        ${messages.filter(({ acknowledged }) => !acknowledged).length ? 'messages--show' : ''}
      `}
    >
      <ul className='messages__ul'>
        {
          messages.map(
            ({ title, body, acknowledged, notification }, i) => (
              acknowledged ?
                null :
                <li
                  key={i}
                  className='messages__li'
                >
                  <section className='messages__content'>
                    <h2 className='messages__heading'>
                      <Text size='md'>
                        { title }
                      </Text>
                    </h2>
                    <p className='messages__body'>
                      <Text size='sm'>
                        { body }
                      </Text>
                    </p>
                  </section>
                  <footer className='messages__footer'>
                    <div className='messages__button-container'>
                      <Button
                        onClick={() => {
                          if (notification) {
                            setNotifications(
                              notifications
                                .map(n => n.notification === notification ? Object.assign(n, { acknowledged: true }) : n)
                            );
                            removeEvent(notification.notifiable);
                            return;
                          }
                          setOnboardingMessages(
                            onboardingMessages.map((m, j) => j === i ? Object.assign(m, { acknowledged: true }) : m),
                          );
                        }}
                      >
                        <Text>
                          OK
                        </Text>
                      </Button>
                    </div>
                  </footer>
                </li>
              ))
        }
      </ul>
    </div>
  );
};

export default Messages;
