import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ disabled, children, onClick }) => (
  <button
    onClick={onClick}
    className={`
      button
      ${disabled ? 'button--disabled' : ''}
    `}
    disabled={disabled}
  >
    <div className='button__content-container'>
      { children }
    </div>
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
