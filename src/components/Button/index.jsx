import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['submit', 'button']),
  shouldShowShadow: PropTypes.bool,
  shouldShowBorder: PropTypes.bool,
};

export default function Button({
  type = 'button',
  children,
  onClick,
  className,
  disabled = false,
  shouldShowShadow = false,
  shouldShowBorder = false,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-0.5 text-base leading-5 rounded-lg font-medium',
        shouldShowShadow && 'box-shadow',
        shouldShowBorder && 'border border-black',
        disabled && 'cursor-not-allowed',
        className
      )}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
