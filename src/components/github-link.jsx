import * as React from 'react';
import styled from '@emotion/styled';

import Link from "../components/link";

const githubIconSrc = require('../images/github.svg').default;

const LinkStyle = styled(Link)`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid black;
  border-radius: 4px;

`;

const GithubImg = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

const TextStyle = styled.div`
  font-size: 16px;
`;

const GithubLink = ({ link, text }) => {
  return (
    <LinkStyle to={link}>
      <GithubImg src={githubIconSrc} alt={"github"} />
      <TextStyle>{text}</TextStyle>
    </LinkStyle>
  );
};

export default GithubLink;
