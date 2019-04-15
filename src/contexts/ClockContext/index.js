import React, {
  useState,
  useEffect,
  createContext,
} from 'react';
import PropTypes from 'prop-types';
import User from '../../lib/User';
import Tick from '../../lib/Tick';

const ClockContext = createContext();

export const ClockContextProvider = ({ children }) => {
  const [user] = useState(new User({}));
  const [tick, setTick] = useState(new Tick({
    user,
    incrementStart: new Date(),
  }));
  const [activeNotifications, setActiveNotifications] = useState(tick.getActiveNotifications());

  const incrementClock = () => {
    const interval = setInterval(() => {
      const { incrementEnd } = tick;
      const fifteenSecondsAfterLastTickInterval = new Date(incrementEnd.getTime() + 15 * 1000);
      const now = new Date();
      if (fifteenSecondsAfterLastTickInterval > now) return;
      const newTick = new Tick({ user, incrementStart: incrementEnd });
      setTick(newTick);
      setActiveNotifications(newTick.getActiveNotifications());
    }, 1000);
    return clearInterval.bind(null, interval);
  };

  useEffect(incrementClock);

  return (
    <ClockContext.Provider
      value={{
        activeNotifications,
        addEvent: user.addEvent.bind(user),
        removeEvent: user.removeEvent.bind(user),
      }}
    >
      { children }
    </ClockContext.Provider>
  );
};

ClockContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClockContext;
