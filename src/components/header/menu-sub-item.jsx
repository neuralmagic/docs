import React from 'react';
import styled from '@emotion/styled';

import Link from '../link';


const Container = styled.div`
  flex: 1 0 21%;
  max-width: 285px;
  padding-left: 20px;
  padding-right: 20px;
  border-right: 1px solid black;
  margin-top: 96px;

  &:last-of-type {
    border-right: none;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.primary};
  }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 50px;
  margin-bottom: 20px;
`;

const TitleText = styled.div`
  width: fit-content;
  font-size: 16px;
  font-weight: bold;
`;

const DescText = styled.div`
  width: fit-content;
  font-size: 14px;
`;

const MenuSubItem = ({title, desc, to, imgSrc}) => {
  return (
    <Container>
      <StyledLink to={to}>
        <Layout>
          <Image src={imgSrc} />
          <TitleText>{title}</TitleText>
          <DescText>{desc}</DescText>
        </Layout>
      </StyledLink>
    </Container>
  )
}

export default MenuSubItem;
