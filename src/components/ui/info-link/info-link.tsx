import React, { FC } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import { Icon, IIconProps } from '../icon';

import styles from './info-link.module.css';


interface ILinkProps {
  isOutsideLink?: boolean;
  href?: string;
  label: string;
  icon?: IIconProps['glyph'],
  iconPlace?: 'iconNone' | 'left' | 'right';
  section?: 'noFooter' | 'infoFooter' | 'footer';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'number';
  textDecoration?: 'textDecorationNone' | 'underline';
  border?: 'borderNone' | 'borderBottomLeft' | 'borderTop';
}

export const InfoLink: FC<ILinkProps> = (props) => {
  const {
    isOutsideLink = false,
    href = '/',
    label,
    icon,
    iconPlace = 'iconNone',
    section = 'noFooter',
    size = 's',
    textDecoration = 'textDecorationNone',
    border = 'borderNone',
    ...restButtonProps
  } = props;

  const classes = cn(
    styles.link,
    styles[size],
    styles[textDecoration],
    styles[border],
    styles[section]
  );

  const linkChildren = (
    <React.Fragment>
      {iconPlace === 'left' && icon && <Icon glyph={icon}/>}
      {<span className={cn(styles.label, styles[iconPlace])}>{label}</span>}
      {iconPlace === 'right' && icon && <Icon glyph={icon}/>}
    </React.Fragment>
  );

  return (
    !isOutsideLink &&
    <Link href={href}>
      <a className={classes}
        {...restButtonProps}
      >
        {linkChildren}
      </a>
    </Link>
    ||
    <a href={href}
      className={classes}
      {...restButtonProps}
      rel="noopener noreferrer" target="_blank"
    >
      {linkChildren}
    </a>
  );
};
