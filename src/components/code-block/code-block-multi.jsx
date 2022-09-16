import * as React from 'react';
import styled from '@emotion/styled';

import CodeHighlight from "./code-highlight";
import CopyButton from "../copy-button";


const Container = styled.div`
  position: relative;
`;

const CodeOutline = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 1.5em;
  background-color: ${props => props.theme.codeBackground};
  border-radius: 4px;
  border: ${props => props.theme.codeBorder} 1px solid;
  overflow: scroll;
`;

const SectionDiv = styled.div`
  margin-top: 2em;
`;

const CopyCodeButton = styled(CopyButton)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
`;


const CodeBlockMulti = ({ sections, sectionTypes, language }) => {
  const [hoverState, setHoverState] = React.useState(false);
  let copyText = sections && sections.length > 0 ? sections[0].join("\n") : "";
  if (copyText.startsWith("$ ")) {
    copyText = copyText.substring(2);
  }

  return (
    <Container onMouseEnter={() => setHoverState(true)}
               onMouseLeave={() => setHoverState(false)}>
      <CodeOutline>
        {sections.map((section, index) => (
          <div>
            <CodeHighlight codeLines={section} language={sectionTypes[index] !== 'output' ? language : 'text'} displayType={sectionTypes[index]} />
            {index < sections.length -1 && <SectionDiv />}
          </div>
        ))}
      </CodeOutline>
      {hoverState ? (
        <CopyCodeButton text={copyText}  />
      ) : ""}
    </Container>
  );
};

export default CodeBlockMulti;
