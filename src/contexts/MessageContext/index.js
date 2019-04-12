import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const enqueueMessage = (message) => {
    setMessages([...messages, message]);
  };

  const dequeueMessage = (message) => {
    setMessages(
      messages
        .filter(m => m !== message),
    );
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        enqueueMessage,
        dequeueMessage,
      }}
    >
      { children }
    </MessageContext.Provider>
  );
};

MessageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MessageContext;
