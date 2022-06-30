import React from 'react';
import styled from '@emotion/styled';

import Link from '../link';


const LinkCards = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  width: calc(50% - 2*20px - 2*1px - 8px);
  margin-bottom: 16px;
  padding: 20px;
  border: 1px solid ${props => props.theme.dividerFaded};
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.primaryFaded};
  }
`;

const LinkHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme.textSecondary};
`;

const LinkDescription = styled.div`
  margin-top: 16px;
  font-size: 1em;
  color: ${props => props.theme.textPrimary};
`;

const LinkCard = ({href, heading, children}) => {
  return (
    <StyledLink to={href}>
      <LinkHeading>{heading}</LinkHeading>
      <LinkDescription>{children}</LinkDescription>
    </StyledLink>
  );
}

export {LinkCards, LinkCard};
