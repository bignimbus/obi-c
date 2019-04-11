import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

const Text = ({
  children,
  inverted,
  size = 'sm',
  invertedDark,
}) => (
  <span
    className={`
      text
      text--${size}
      ${inverted ? 'text--inverted' : ''}
      ${invertedDark ? 'text--inverted-dark' : ''}
    `}
  >
    { children }
  </span>
);

Text.propTypes = {
  size: PropTypes.string,
  inverted: PropTypes.bool,
  invertedDark: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Text;
