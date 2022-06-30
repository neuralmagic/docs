import * as React from 'react';
import styled from '@emotion/styled';

import Link from "../components/link";

const slackIconSrc = require('../images/slack.png').default;

const LinkStyle = styled(Link)`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid black;
  border-radius: 4px;
  text-decoration: none;
  color: ${props => props.theme.textPrimary}
`;

const SlackImg = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 8px;
`;

const TextStyle = styled.div`
  font-size: 16px;
`;

const SlackLink = ({ text }) => {
  return (
    <LinkStyle to="https://join.slack.com/t/discuss-neuralmagic/shared_invite/zt-q1a1cnvo-YBoICSIw3L1dmQpjBeDurQ">
      <SlackImg src={slackIconSrc} alt={"slack"} />
      <TextStyle>{text}</TextStyle>
    </LinkStyle>
  );
};

export default SlackLink;
