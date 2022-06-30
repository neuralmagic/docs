import React, { useState } from 'react';
import styled from '@emotion/styled';

import Link from '../link';


const Container = styled.div`
  width: fit-content;
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
  width: calc(100vw - 2*96px);
  padding: 0 96px 96px 96px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #ffffff;
  border-bottom: 1px solid black;
  z-index: 1000000;
`;

const MenuItem = ({text, to, children}) => {
  const [childState, setChildState] = useState({
    textHover: false,
    childHover: false,
  });

  const setTextHover = (val) => {
    setChildState({
      ...childState,
      textHover: val
    })
  };
  const setChildHover = (val) => {
    setChildState({
      childHover: val,
      textHover: val === true ? false : childState.textHover
    })
  };

  let textHtml = (
    <ItemText onMouseEnter={() => setTextHover(true)}
              onMouseLeave={() => setTextHover(false)}>
      {text}
    </ItemText>
  );

  if (to) {
    textHtml = (
      <Link to={to}>
        {textHtml}
      </Link>
    )
  }

  return (
    <Container>
      {textHtml}
      <ChildContainer onMouseEnter={() => setChildHover(true)}
                      onMouseLeave={() => setChildHover(false)}
                      css={{display: childState.textHover || childState.childHover ? 'flex' : 'none'}}>
        {children}
      </ChildContainer>
    </Container>
  )
}

export default MenuItem;
