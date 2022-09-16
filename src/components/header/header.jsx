import React from 'react';
import styled from '@emotion/styled';
import { maxMediaQueries, minMediaQueries } from "../../styles";

import Link from '../link';
import NMLogo from '../../images/logo-neuralmagic.svg';
import NMLogoMobile from '../../images/logo.svg';

import MenuItem from './menu-item';
import MenuSubItem from './menu-sub-item';
import HeaderMenusConfig from '../../configs/header-menus.config';
import MobileSidenav from "./mobile-sidenav";
import MobileMenuItem from "./mobile-menu-item";


const Container = styled.div`
  width: 100%;
  max-width: 1360px;
  height: 80px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  ${minMediaQueries["xl"]} {
    padding-left: 80px;
    padding-right: 80px;
    margin: 28px auto 0 auto;
  }

  ${maxMediaQueries["xl"]} {
    padding-left: 40px;
    padding-right: 40px;
    margin: 16px auto 0 auto;
  }

  ${maxMediaQueries["lg"]} {
    padding-left: 24px;
    padding-right: 24px;
    margin: 0 auto 0 auto;
  }

  ${maxMediaQueries["md"]} {
    padding-left: 16px;
    padding-right: 16px;
    margin: 0 auto 0 auto;
  }
`;

const NMImage = styled.img`
  width: 150px;

  ${maxMediaQueries["lg"]} {
    display: none;
  }
`;

const NMImageMobile = styled.img`
  width: 40px;

  ${minMediaQueries["lg"]} {
    display: none;
  }
`;

const MenuContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  display: flex;

  ${maxMediaQueries["lg"]} {
    display: none;
  }
`;

const MobileMenuContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  display: flex;

  ${minMediaQueries["lg"]} {
    display: none;
  }
`;

const Header = ({data}) => {
  return (
    <Container>
      <Link to={'https://neuralmagic.com'}>
        <NMImage src={NMLogo} alt={'Neural Magic Logo'} />
        <NMImageMobile src={NMLogoMobile} alt={'Neural Magic Logo'} />
      </Link>
      <MenuContainer>
        {
          HeaderMenusConfig.items.map((config, index) =>
            <MenuItem key={config.title}
                      text={config.title}
                      to={config.link}>
              {
                config.subItems.map((subConfig) => (
                  <MenuSubItem key={subConfig.title}
                               title={subConfig.title}
                               desc={subConfig.desc}
                               imgSrc={subConfig.img}
                               to={subConfig.link} />
                ))
              }
            </MenuItem>
          )
        }
      </MenuContainer>
      <MobileMenuContainer>
        <MobileSidenav>
          {
            HeaderMenusConfig.items.map((config) =>
              <MobileMenuItem key={config.title}
                              text={config.title}
                              to={config.link}
                              subItems={config.subItems} />
            )
          }
        </MobileSidenav>
      </MobileMenuContainer>
    </Container>
  );
}

export default Header;
