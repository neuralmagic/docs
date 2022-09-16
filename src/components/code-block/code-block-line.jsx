import * as React from 'react';
import styled from '@emotion/styled';

const Pre = styled.pre`
  text-align: left;
  padding: 0;
  margin: 0;
`;

const Line = styled.div`
  display: table-row;
  padding-right: 1em;
`;

const LinePrefix = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
  padding-right: 1em;
`;


function checkTrimLine(line, startChar) {
  function checkIndex(index) {
    const result = {
      remove: false,
      numTokens: -1,
      startsWithToken: false,
    };

    if (line.length <= index || !line[index]) {
      return result;
    }

    if (line[index].content === startChar) {
      result.remove = true;
      result.numTokens = index + 1;
      result.startsWithToken = false;
    } else if (line[index].content.startsWith(startChar)) {
      result.remove = true;
      result.numTokens = index;
      result.startsWithToken = true;
    }

    return result;
  }

  let result = checkIndex(0);

  if (!result.remove) {
    result = checkIndex(1);
  }

  if (!result.remove) {
    return false;
  }

  for (let counter = 0; counter < result.numTokens; counter++) {
    line.shift();
  }

  if (result.startsWithToken) {
    line[0].content = line[0].content.substring(1, line[0].content.length);
  }

  return true;
}


const CodeBlockLine = ({ index, line, getLineProps, getTokenProps, displayType }) => {
  const lineProps = getLineProps({ line, key: index});
  const displayOutput = displayType === 'output';
  const displayShell = displayType === 'shell';
  const displayLines = displayType === 'code';
  let removedPrefix = (displayOutput && checkTrimLine(line, '>')) || (displayShell && checkTrimLine(line, '$'));

  if (removedPrefix && line.length > 0 && line[0].content) {
    line[0].content = line[0].content.trimStart();
  }

  return (
    <Line {...lineProps}>
      {(displayOutput || displayShell || displayLines) && (
        <LinePrefix>
          {displayLines ? index + 1 : displayOutput ? '>' : displayShell && index === 0 ? '$' : ''}
        </LinePrefix>
      )}
      <LineContent>
        {line.map((token, key) => (
          <span key={key} {...getTokenProps({ token, key })} />
        ))}
      </LineContent>
    </Line>
  );
};

export default CodeBlockLine;
