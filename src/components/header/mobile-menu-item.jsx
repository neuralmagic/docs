import React, { useState } from 'react';
import styled from '@emotion/styled';

import Link from '../link';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ItemTitle = styled.div`
  font-size: 12px;
`;

const SubItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubItemLink = styled(Link)`
  color: ${props => props.theme.textPrimary};
  text-decoration-color: ${props => props.theme.textPrimary};
`;

const MobileMenuItem = ({text, to, subItems}) => {
  let textHtml = text;

  if (to) {
    textHtml = (
      <Link to={to}>
        {textHtml}
      </Link>
    )
  }

  return (
    <Container>
      <ItemTitle>
        {textHtml}
      </ItemTitle>

      <SubItemsContainer>
        {
          subItems.map((subConfig) => (
            <SubItemLink key={subConfig.title} to={subConfig.link}>{subConfig.title}</SubItemLink>
          ))
        }
      </SubItemsContainer>
    </Container>
  )
}

export default MobileMenuItem;
