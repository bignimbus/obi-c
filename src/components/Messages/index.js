import React, { useContext } from 'react';
import Text from '../Text';
import ClockContext from '../../contexts/ClockContext';

const Messages = () => {
  const { removeEvent, activeNotifications } = useContext(ClockContext);

  return (
    <div>
      <ul>
        {
          activeNotifications.map(
            ({ title, body, notifiable }, i) => (
              <li key={i}>
                <section>
                  <h2>
                    <Text size='md'>
                      { title }
                    </Text>
                  </h2>
                  <p>
                    <Text size='sm'>
                      { body }
                    </Text>
                  </p>
                </section>
                <footer>
                  <button
                    onClick={() => {
                      removeEvent(notifiable);
                    }}
                  >
                    OK
                  </button>
                </footer>
              </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Messages;
