import React from 'react';
import styled from '@emotion/styled';
import Link from '../link';
import GithubLink from '../github-link';
import SlackLink from '../slack-link';

const Container = styled.div`
  height: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const Header = styled.div`
  color: ${props => props.theme.textPrimary};
  font-weight: bold;
  font-size: 12px;
`;

const HeaderDivider = styled.div`
  height: 1px;
  margin-top: 4px;
  margin-bottom: 12px;
  width: 100%;
  background-color: black;
`;

const StyledLink = styled(Link)`
  margin-bottom: 8px;
  color: ${props => props.theme.textSecondary};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.textPrimary};
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Padding = styled.div`
  height: 8px;
`;

const DocsSidebarRight = ({ currentSlug, mdxTOC, githubURL }) => {
  const h2s = [];

  if (mdxTOC && mdxTOC.items && mdxTOC.items[0].items) {
    mdxTOC.items[0].items.forEach((item) => {
      h2s.push({
        title: item.title,
        link: `${currentSlug}${item.url}`,
      })
    });
  }

  return (
    <Container>
      {h2s.length > 0 ?
        <ContentsContainer>
          <Header>CONTENT</Header>
          <HeaderDivider />
          {h2s.map((h2Obj) => (
            <StyledLink key={h2Obj.title} to={h2Obj.link}>{h2Obj.title}</StyledLink>
          ))}
        </ContentsContainer>
      : ""}
      <ButtonContainer>
        <Header>ACTIONS</Header>
        <HeaderDivider />
        {githubURL ? <GithubLink link={githubURL} text="Edit on GitHub" /> : ""}
        <Padding />
        <SlackLink text="Ask on Slack" />
      </ButtonContainer>
    </Container>
  );
}

export default DocsSidebarRight;
