import React from 'react';
import styled from '@emotion/styled';

const StyledButton = styled.div`
  border: 1px solid ${props => props.theme.divider};
  border-radius: 4px;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.primaryFaded};
  }
`;

const Button = ({children, ...props}) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;
