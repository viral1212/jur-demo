import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '../Typography';
import { TriangleIcon, UserAvatarIcon } from '../Icon';

UserItem.propTypes = {
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  className: PropTypes.string,
  isShowSentIcon: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export default function UserItem({
  onClick,
  isSelected = false,
  className,
  isShowSentIcon = false,
  title,
  subtitle,
  description,
}) {
  return (
    <div
      className={clsx('flex cursor-pointer items-center', className)}
      onClick={onClick}
    >
      <div className="relative">
        <UserAvatarIcon
          className={clsx(
            'border bottom-1 border-black rounded-full',
            isSelected && 'bg-cyan-250'
          )}
        />
        {isShowSentIcon && (
          <TriangleIcon
            className="absolute bottom-0 -right-2"
            width={18.12}
            height={18}
          />
        )}
      </div>
      <div className="flex flex-col items-start ml-5 font-medium">
        {title && <Typography text={title} />}
        {subtitle && (
          <Typography
            text={subtitle}
            className="text-gray-350 font-semibold leading-none"
          />
        )}
        {description && (
          <Typography
            text={description}
            className="text-gray-350 font-normal leading-none"
          />
        )}
      </div>
    </div>
  );
}
