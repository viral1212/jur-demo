import React from 'react';
import PropTypes from 'prop-types';

UserAvatarIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default function UserAvatarIcon({ width = 48, height = 48, className }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.33334 40.6667C7.33334 34.4167 15.6667 34.4167 19.8333 30.25C21.9167 28.1667 15.6667 28.1667 15.6667 17.75C15.6667 10.8062 18.4438 7.33333 24 7.33333C29.5563 7.33333 32.3333 10.8062 32.3333 17.75C32.3333 28.1667 26.0833 28.1667 28.1667 30.25C32.3333 34.4167 40.6667 34.4167 40.6667 40.6667"
        stroke="black"
        strokeLinecap="round"
      />
    </svg>
  );
}
