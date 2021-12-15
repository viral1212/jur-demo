import React from 'react';
import PropTypes from 'prop-types';

CloseIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
};

export default function CloseIcon({ width = 24, height = 24, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 24 24"
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#000000">
          <g>
            <g>
              <path
                d="M13.414 12l4.293-4.293c.391-.391.391-1.023 0-1.414-.39-.391-1.023-.391-1.414 0L12 10.586 7.707 6.293c-.39-.391-1.023-.391-1.414 0-.39.391-.39 1.023 0 1.414L10.586 12l-4.293 4.293c-.39.391-.39 1.023 0 1.414.195.195.451.293.707.293.256 0 .512-.098.707-.293L12 13.414l4.293 4.293c.195.195.451.293.707.293.256 0 .512-.098.707-.293.391-.391.391-1.023 0-1.414L13.414 12z"
                transform="translate(-988 -196) translate(420 188) translate(568 8)"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
