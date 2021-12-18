import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import { LeftArrowIcon } from '../components/Icon';
import Typography from '../components/Typography';
import clsx from 'clsx';

Layout.prototypes = {
  showBackButton: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onHandleBackBtnClick: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  contentAlignment: PropTypes.string,
  className: PropTypes.string,
};

export default function Layout({
  showBackButton = false,
  children,
  onHandleBackBtnClick,
  title,
  subTitle,
  contentAlignment = 'center',
  className = 'mx-auto',
}) {
  return (
    <div className={clsx(className, 'lg:container relative my-20')}>
      <div className="absolute top-4 left-12">
        {showBackButton && (
          <div>
            <Button onClick={onHandleBackBtnClick}>
              <LeftArrowIcon width={30} height={30} />
            </Button>
          </div>
        )}
      </div>
      <div
        className={clsx(
          `text-${contentAlignment}`,
          contentAlignment === 'left' && 'pl-28'
        )}
      >
        <div>
          {title && (
            <Typography
              text={title}
              className="pt-4 text-5xl leading-10 font-normal"
            />
          )}
          {subTitle && (
            <Typography
              text={subTitle}
              className="pt-4 text-3xl text-gray-350 leading-8 font-normal"
            />
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
