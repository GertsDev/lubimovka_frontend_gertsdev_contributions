import { FC } from 'react';

import { Page } from 'components/page';
import { Menu } from 'components/ui/menu';
import { Icon } from 'components/ui/icon';
import { Navbar } from 'components/navbar';
import { Logotype } from 'components/logotype';

import { mainNavigationItems } from 'shared/constants/main-navigation-items';
import { formLink, donationLink } from 'shared/constants/action-link-items';
import { socialLinkItems } from 'shared/constants/social-link-items';
import { OverlayNav } from 'components/overlay-nav';
import * as breakpoints from 'shared/breakpoints.js';
import { useMediaQuery } from 'shared/hooks/use-media-query';

export const AppLayout: FC = (props) => {
  const { children } = props;

  const isMobile = useMediaQuery(`(max-width: ${breakpoints['tablet-portrait']})`);

  return (
    <Page>
      <Page.Header>
        <Navbar>
          <Navbar.Logotype>
            <Logotype
              href="#"
              title="Фестиваль Любимовка"
            />
          </Navbar.Logotype>
          <Navbar.Actions>
            <Navbar.Section primary>
              <Menu type="main-navigation">
                {mainNavigationItems
                  .filter(item => !item.mobileOnly)
                  .map((item) => (
                    <Menu.Item key={item.text} href={item.href}>
                      {item.text}
                    </Menu.Item>
                  ))}
              </Menu>
            </Navbar.Section>
            <Navbar.Section>
              <Menu type="social-links">
                {socialLinkItems.map((item) => (
                  <Menu.Item key={item.text} href={item.href}>
                    {item.text}
                  </Menu.Item>
                ))}
              </Menu>
            </Navbar.Section>
            <Navbar.Section>
              <Navbar.HelpLink label={donationLink.text} href={donationLink.href}/>
            </Navbar.Section>
          </Navbar.Actions>
        </Navbar>
      </Page.Header>
      {children}
      {isMobile && <Page.Overlay isOpen={false}>
        <OverlayNav>
          <OverlayNav.Logotype>
            <Logotype href='/' title="Фестиваль Любимовка" />
          </OverlayNav.Logotype>
          <OverlayNav.Menu>
            <Menu type="overlay-navigation">
              {mainNavigationItems.map((item, idx) => (
                <Menu.Item key={idx} href={item.href}>
                  {item.text}
                </Menu.Item>
              ))}
            </Menu>
          </OverlayNav.Menu>
          <OverlayNav.Actions>
            <Menu type='overlay-actions'>
              {[formLink, donationLink].map((item, idx) => (
                <Menu.Item key={idx} href={item.href}>
                  {item.text}
                  <Icon glyph='arrow-right' />
                </Menu.Item>
              ))}
            </Menu>
          </OverlayNav.Actions>
          <OverlayNav.Socials>
            <Menu type='overlay-social-links'>
              {socialLinkItems.map((item, idx) => (
                <Menu.Item
                  key={idx}
                  href={item.href}
                  mods={{ primary: item.primary ?? false }}>
                  {item.text}
                  <Icon glyph='arrow-right' />
                </Menu.Item>
              ))}
            </Menu>
          </OverlayNav.Socials>
        </OverlayNav>
      </Page.Overlay>}
    </Page>
  );
};
