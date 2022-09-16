import React from 'react';
import styled from '@emotion/styled';
import { maxMediaQueries, minMediaQueries } from "../../styles";

import Link from '../link';
import Button from "../button";


const LinkCards = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  width: calc(50% - 8px);
  margin-bottom: 16px;
  text-decoration: none;
  position: relative;

  ${maxMediaQueries["sm"]} {
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
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
      <StyledButton>
        <LinkHeading>{heading}</LinkHeading>
        <LinkDescription>{children}</LinkDescription>
      </StyledButton>
    </StyledLink>
  );
}

export {LinkCards, LinkCard};
