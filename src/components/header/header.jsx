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
  display: flex;
  flex-direction: column;
`;

const NotificationContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  box-sizing: border-box;
  background-color: #092040;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const NotificationText = styled.span`
  width: 100%;
  max-width: 1360px;
  color: #FFFFFF;
  box-sizing: border-box;

  ${minMediaQueries["xl"]} {
    padding-left: 80px;
    padding-right: 80px;
  }

  ${maxMediaQueries["xl"]} {
    padding-left: 40px;
    padding-right: 40px;
  }

  ${maxMediaQueries["lg"]} {
    padding-left: 24px;
    padding-right: 24px;
  }

  ${maxMediaQueries["md"]} {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const HeaderContainer = styled.div`
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
        <NotificationContainer>
          <NotificationText>
            🚨 Note: The current Docs site is outdated.
            Neural Magic's 1.7 release slated for March 2024 will include a Docs refresh.
            Meanwhile, please consult our GitHub repositories for the content:
            &nbsp; <a href="https://github.com/neuralmagic/deepsparse" style={{color: "#3171A8"}}>DeepSparse</a>,
            &nbsp; <a href="https://github.com/neuralmagic/sparseml" style={{color: "#3171A8"}}>SparseML</a>,
            &nbsp; <a href="https://github.com/neuralmagic/sparsezoo" style={{color: "#3171A8"}}>SparseZoo</a>.
          </NotificationText>
        </NotificationContainer>
        <HeaderContainer>
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
        </HeaderContainer>
      </Container>
  );
}

export default Header;
