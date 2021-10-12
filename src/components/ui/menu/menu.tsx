import { ReactNode } from 'react';
import classNames from 'classnames/bind';

import { MenuProvider } from './menu.context';
import { MenuItem } from './item';

import mainNavigationStyles from './type/main-navigation.module.css';
import socialLinksStyles from './type/social-links.module.css';

export const styles = {
  'main-navigation': mainNavigationStyles,
  'social-links': socialLinksStyles,
};

export type MenuType = keyof typeof styles;

interface IMenuProps {
  type: MenuType,
  children: ReactNode,
}

export const Menu = (props: IMenuProps): JSX.Element => {
  const {
    type,
    children,
  } = props;

  const cx = classNames.bind(styles[type]);

  return (
    <ul className={cx('menu')}>
      <MenuProvider value={{ type }}>
        {children}
      </MenuProvider>
    </ul>
  );
};

Menu.Item = MenuItem;
