import React, { useState } from 'react';
import styled from '@emotion/styled';

import Button from "../button";

import IconDropdown from '../../images/icons/icon-dropdown.svg';


const Container = styled.div`
  width: fit-content;
`;

const StyledIconDropdown = styled(IconDropdown)`
  width: 40px;
`;

const StyledButton = styled(Button)`
  border: none;
`;

const ItemText = styled.div`
  width: fit-content;
  padding: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const ChildContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh - 60px);
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  z-index: 1000000;
  overflow: scroll;
`;

const MobileSidenav = ({children}) => {
  const [showPopup, setShowPopup] = useState(false);

  const clicked = () => {
    setShowPopup(!showPopup);
  }

  return (
    <Container>
      <StyledButton onClick={clicked}>
        <StyledIconDropdown />
      </StyledButton>
      <ChildContainer css={{display: showPopup ? 'flex' : 'none'}}>
        {children}
      </ChildContainer>
    </Container>
  )
}

export default MobileSidenav;
