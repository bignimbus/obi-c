import './index.css';
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  disabled,
  children,
  type = 'button',
}) => (
  <button
    type={type}
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
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  requireOnClickUnlessTypeSubmit (props, propName, componentName) {
    const isTypeSubmit = props.type === 'submit';
    return isTypeSubmit || (typeof props.onClick === 'function') ?
      undefined :
      new Error('component Button must have an onClick handler unless it is of type "submit"');
  },
};

export default Button;
