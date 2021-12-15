import React from 'react';
import PropTypes from 'prop-types';

TriangleIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default function TriangleIcon({ width = 20, height = 20, className }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5622 9.1057C19.3031 9.47318 19.3031 10.5299 18.5622 10.8974L2.44436 18.8923C1.77965 19.2221 1 18.7385 1 17.9965V12.0001L10 10.0001L1 7.79442L1 2.00659C1 1.2646 1.77966 0.78103 2.44437 1.11075L18.5622 9.1057Z"
        stroke="black"
        strokeLinejoin="round"
      />
    </svg>
  );
}
