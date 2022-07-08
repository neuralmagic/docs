import * as React from 'react';
import styled from '@emotion/styled';

import Link from "../components/link";
import Button from "./button";

const githubIconSrc = require('../images/github.svg').default;

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const ButtonStyle = styled(Button)`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const GithubImg = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

const TextStyle = styled.div`
  font-size: 16px;
  color: ${props => props.theme.textPrimary};
`;

const GithubLink = ({ link, text }) => {
  return (
    <LinkStyle to={link}>
      <ButtonStyle>
        <GithubImg src={githubIconSrc} alt={"github"} />
        <TextStyle>{text}</TextStyle>
      </ButtonStyle>
    </LinkStyle>
  );
};

export default GithubLink;
