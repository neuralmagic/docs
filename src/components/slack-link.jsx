import * as React from 'react';
import styled from '@emotion/styled';

import Link from "../components/link";
import Button from "./button";

const slackIconSrc = require('../images/slack.png').default;

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const ButtonStyle = styled(Button)`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const SlackImg = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

const TextStyle = styled.div`
  font-size: 16px;
  color: ${props => props.theme.textPrimary};
`;

const SlackLink = ({ text }) => {
  return (
    <LinkStyle to="https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ">
      <ButtonStyle>
        <SlackImg src={slackIconSrc} alt={"slack"} />
        <TextStyle>{text}</TextStyle>
      </ButtonStyle>
    </LinkStyle>
  );
};

export default SlackLink;
