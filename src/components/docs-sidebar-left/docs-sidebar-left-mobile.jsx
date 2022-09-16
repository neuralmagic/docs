import React, {useState} from 'react';
import styled from '@emotion/styled';

import Button from "../button";
import DocsSidebarLeft from "./docs-sidebar-left";
import { maxMediaQueries, minMediaQueries } from "../../styles";

import IconSidenav from '../../images/icons/icon-sidenav.svg';
import IconClose from '../../images/icons/icon-close.svg'


const ButtonContainer = styled(Button)`
  border: none;
  position: fixed;
  bottom: 24px;
  left: ${props => props.navShown ? 'unset' : '24px'};
  right: ${props => !props.navShown ? 'unset' : '24px'};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.background};
  border-radius: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  z-index: 100000;
  opacity: 0.9;

  :hover {
    background-color: ${props => props.theme.background};
  }

  ${minMediaQueries["sm"]} {
    display: none;
  }
`;

const StyledIconSidenav = styled(IconSidenav)`
  width: 28px;
  color: ${props => props.theme.textPrimary};
  fill: ${props => props.theme.textPrimary};
`;

const StyledIconClose = styled(IconClose)`
  width: 28px;
  color: ${props => props.theme.textPrimary};
  fill: ${props => props.theme.textPrimary};
`;

const SidebarContainer = styled.div`
  display: ${props => props.navShown ? 'inherit' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: calc(100% - 96px);
  background-color: ${props => props.theme.background};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 1000000;
  padding-left: 24px;
  padding-bottom: 24px;
  box-sizing: border-box;

  ${minMediaQueries["sm"]} {
    display: none;
  }
`;

const Background = styled.div`
  display: ${props => props.navShown ? 'inherit' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: ${props => props.theme.backgroundOverlay};
  z-index: 100000;
`;


const DocsSidebarLeftMobile = ({currentId, nestedMdxEdges}) => {
  const [showPopup, setShowPopup] = useState(false);

  const clicked = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <Background navShown={showPopup} onClick={clicked} />

      <ButtonContainer onClick={clicked} navShown={showPopup}>
        {showPopup ? <StyledIconClose /> : <StyledIconSidenav /> }
      </ButtonContainer>

      <SidebarContainer navShown={showPopup}>
        <DocsSidebarLeft currentId={currentId} nestedMdxEdges={nestedMdxEdges} />
      </SidebarContainer>
    </div>
  );
}

export default DocsSidebarLeftMobile;
