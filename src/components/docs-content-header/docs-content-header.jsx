import React from 'react';
import styled from '@emotion/styled';

import IconHome from '../../images/icons/icon-home.svg';
import IconRight from '../../images/icons/icon-arrow-right.svg';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const IconHomeStyle = styled(IconHome)`
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  color: ${props => props.theme.textPrimary};
  fill: ${props => props.theme.textPrimary};
`;

const IconRightStyle = styled(IconRight)`
  width: 12px;
  height: 12px;
  flex: 0 0 12px;
  color: ${props => props.theme.textSecondary};
  fill: ${props => props.theme.textSecondary};
  margin-left: 4px;
  margin-right: 4px;
`;

const LinkPathsContainer = styled.div`
  margin-left: 8px;
  display: flex;
`;

const LinkArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LinkText = styled.div`
  font-size: 12px;
  color: ${props => props.theme.textPrimary};
`;

const getPagesRecursive = (currentId, nestedMdxEdges) => {
  let matches = [];
  nestedMdxEdges.forEach((edge) => {
    if (matches.length > 0) {
      return; // already matched, skip the rest
    }

    if (edge.id === currentId) {
      matches.push(edge);

      return;
    }

    const childMatches = getPagesRecursive(currentId, edge.children);

    if (childMatches.length > 0) {
      matches = [edge, ...childMatches];
    }
  });

  return matches;
}

const DocsContentHeader = ({ currentId, nestedMdxEdges }) => {
  const pages = getPagesRecursive(currentId, nestedMdxEdges);

  return (
    <Container>
      <IconHomeStyle />
      <LinkPathsContainer>
        {pages.map((page) => (
          <LinkArrowContainer key={page.id}>
            <LinkText>{page.title}</LinkText>
            {page.id !== currentId ? <IconRightStyle /> : ""}
          </LinkArrowContainer>
        ))}
      </LinkPathsContainer>
    </Container>
  );
}

export default DocsContentHeader;
