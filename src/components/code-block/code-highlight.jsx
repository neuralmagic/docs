import * as React from 'react';
import styled from '@emotion/styled';
import Highlight, { defaultProps, Prism } from 'prism-react-renderer';
import { getTheme } from '../../configs/code-block-config';
import CodeBlockLine from "./code-block-line";

const theme = getTheme();

const Pre = styled.pre`
  text-align: left;
  padding: 0;
  margin: 0;
`;

const Line = styled.div`
  display: table-row;
  padding-right: 1em;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
`;


const CodeHighlight = ({ codeLines, language, displayType }) => {
  const code = codeLines.join('\n');

  return (
    <Highlight {...defaultProps} Prism={Prism} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {
            tokens.map((line, i) => (
              <CodeBlockLine index={i}
                             line={line}
                             getLineProps={getLineProps}
                             getTokenProps={getTokenProps}
                             displayType={displayType} />
            ))
          }
        </Pre>
      )}
    </Highlight>
  );
};

export default CodeHighlight;
