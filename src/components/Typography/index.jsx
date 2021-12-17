import React from 'react';
import PropTypes from 'prop-types';

Typography.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default function Typography({ text, className = 'text-base' }) {
  return (
    <div className={className}>
      <span className="truncate">{text}</span>
    </div>
  );
}
