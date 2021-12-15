import React from 'react';
import PropTypes from 'prop-types';

TextItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default function TextItem({ text, className = 'text-base' }) {
  return (
    <div className={className}>
      <span>{text}</span>
    </div>
  );
}
