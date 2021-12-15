import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '../Button';
import { CloseIcon } from '../Icon';

InputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  isIconDisabled: PropTypes.bool,
  onIconClick: PropTypes.func,
};

export default function InputField({
  className,
  type = 'text',
  placeholder = 'write here!',
  name,
  disabled = false,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  value,
  showCloseIcon,
  isIconDisabled,
  onIconClick,
}) {
  return (
    <div className={clsx('relative border border-black', className)}>
      <input
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        className="h-12 w-full pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none text-base font-medium leading-5"
      />
      {showCloseIcon && (
        <div className="absolute top-2.5 right-3">
          <Button disabled={isIconDisabled} onClick={onIconClick}>
            <CloseIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
