import React from 'react';
import styled from '@emotion/styled';

import Link from '../link';
import NMLogo from '../../images/logo.svg';

import MenuItem from './menu-item';
import MenuSubItem from './menu-sub-item';
import HeaderMenusConfig from '../../configs/header-menus.config';


const Container = styled.div`
  width: calc(100% - 2*80px);
  max-width: 1200px;
  height: 80px;
  margin: 28px auto 0px auto;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  align-items: center;
`;

const NMImage = styled.img`
  width: 150px;
`;

const MenuContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  display: flex;
`;

const Header = ({data}) => {
  return (
    <Container>
      <Link to={'https://neuralmagic.com'}>
        <NMImage src={NMLogo} alt={'Neural Magic Logo'} />
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
    </Container>
  );
}

export default Header;
