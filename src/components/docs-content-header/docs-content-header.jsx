import React from 'react';
import styled from '@emotion/styled';

import IconHome from '../../images/icons/icon-home.svg';
import IconRight from '../../images/icons/icon-arrow-right.svg';

import { maxMediaQueries, minMediaQueries } from "../../styles";
import GithubLink from "../github-link";
import SlackLink from "../slack-link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavContainer = styled.div`
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
  line-height: 1.2em;
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 16px;
  justify-items: stretch;

  ${minMediaQueries["xl"]} {
    display: none;
  }
`;

const Spacer = styled.div`
  width: 8px;
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

const DocsContentHeader = ({ currentId, nestedMdxEdges, githubURL }) => {
  const pages = getPagesRecursive(currentId, nestedMdxEdges);

  return (
    <Container>
      <NavContainer>
        <IconHomeStyle />
        <LinkPathsContainer>
          {pages.map((page) => (
            <LinkArrowContainer key={page.id}>
              <LinkText>{page.title}</LinkText>
              {page.id !== currentId ? <IconRightStyle /> : ""}
            </LinkArrowContainer>
          ))}
        </LinkPathsContainer>
      </NavContainer>

      <ButtonsContainer>
        {githubURL ?
          <GithubLink link={githubURL} text="Edit on GitHub" small={true} />
          : ""}
        {githubURL ? <Spacer /> : ""}
        <SlackLink text="Ask on Slack" small={true} />
      </ButtonsContainer>
    </Container>
  );
}

export default DocsContentHeader;
