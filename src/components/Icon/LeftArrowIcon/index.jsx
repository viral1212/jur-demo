import React from 'react';
import PropTypes from 'prop-types';

LeftArrowIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default function LeftArrowIcon({ width = 40, height = 40, className }) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3335 10L13.3335 20L23.3335 30"
        stroke="black"
        strokeLinecap="round"
      />
    </svg>
  );
}
