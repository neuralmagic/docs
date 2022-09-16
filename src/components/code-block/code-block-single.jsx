import * as React from 'react';
import styled from '@emotion/styled';

import CodeHighlight from "./code-highlight";
import CopyButton from "../copy-button";


const Container = styled.div`
  position: relative;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: ${props => props.theme.codeBackground};
  border-radius: 4px;
  border: ${props => props.theme.codeBorder} 1px solid;
  overflow: hidden;
  display: flex;
`;

const CodeOutline = styled.div`
  padding: 1em;
  overflow: scroll;
  flex: 1 1;
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${props => props.theme.codeBorder};
  margin-left: 8px;
`;

const CopyCodeButton = styled(CopyButton)`
  width: 40px;
  padding-left: 4px;
  padding-right: 4px;
`;


const CodeBlockSingle = ({ code, language }) => {
  let copyText = code && code.length > 0 ? code[0] : "";
  if (copyText.startsWith("$ ")) {
    copyText = copyText.substring(2);
  }

  return (
    <Container>
      <CodeOutline>
        <CodeHighlight codeLines={code} language={language} />
      </CodeOutline>
      <Divider />
      <CopyCodeButton text={copyText} />
    </Container>
  );
};

export default CodeBlockSingle;
