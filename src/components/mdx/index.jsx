import * as React from 'react';
import styled from '@emotion/styled';

import CodeBlock from '../code-block';
import AnchorTag from './anchor';
import {LinkCards, LinkCard} from "./link-cards";

const appendString = (children) => {
  if (Array.isArray(children)) {
    return children.reduce((acc, current) => {
      if (typeof current === 'string') {
        return acc.concat(current);
      } else if (typeof current === 'object') {
        return acc.concat(current.props.children);
      } else {
        return acc;
      }
    }, '');
  } else {
    return children;
  }
};

const headingId = (children) => {
  return appendString(children).replace(/\s+/g, '-').toLowerCase()
}

const Table = styled.table`
  border-collapse: collapse;
`;

const BorderedTh = styled.th`
  border: solid 1px ${props => props.theme.divider};
  margin: 0;
  padding-left: 8px;
  padding-right: 8px;
`;

const BorderedTd = styled.td`
  border: solid 1px ${props => props.theme.divider};
  margin: 0;
  padding-left: 8px;
  padding-right: 8px;
`;

export default {
  LinkCards: LinkCards,
  LinkCard: LinkCard,
  h1: (props) => (
    <h1
      className="heading1"
      id={headingId(props.children)}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="heading2"
      id={headingId(props.children)}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="heading3"
      id={headingId(props.children)}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="heading4"
      id={headingId(props.children)}
      {...props}
    />
  ),
  h5: (props) => (
    <h5
      className="heading5"
      id={headingId(props.children)}
      {...props}
    />
  ),
  h6: (props) => (
    <h6
      className="heading6"
      id={headingId(props.children)}
      {...props}
    />
  ),
  p: (props) => <p className="paragraph" {...props} />,
  code: CodeBlock,
  a: AnchorTag,
  td: BorderedTd,
  th: BorderedTh,
  table: Table,
};
