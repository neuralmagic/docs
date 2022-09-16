import * as React from 'react';
import { Prism } from 'prism-react-renderer';
import { applyLanguages } from '../../configs/code-block-config';

import CodeBlockSingle from './code-block-single';
import CodeBlockMulti from './code-block-multi';

function isEmptyLine(line) {
  return !line || !line.trim();
}

function cleanCodeLines(codeLines) {
  let cleaned = codeLines;

  if (cleaned && cleaned.length > 1 && isEmptyLine(cleaned[cleaned.length - 1])) {
    cleaned.splice(-1);
    cleanCodeLines(cleaned);
  }

  return codeLines;
}

function getLineType(line, prev) {
  if (!line || !line.trim()) {
    return null;
  }

  if (line && line[0] === '>') {
    return 'output';
  }

  if ((line && line[0] === '$') || prev === 'shell') {
    return 'shell';
  }

  return 'code';
}

function splitCode(code) {
  const lines = code.split('\n');
  const sections = [];
  const sectionTypes = [];
  let currentIndex = -1;
  let lastCheck = null;

  lines.forEach((line) => {
    let lineType = getLineType(line, lastCheck);

    if (lastCheck === null && lineType === null) {
      lineType = 'code';
    } else if (lineType === null) {
      lineType = lastCheck;
    }

    if (lastCheck !== lineType) {
      sections.push([]);
      sectionTypes.push(lineType);
      currentIndex += 1;
    }

    sections[currentIndex].push(line);
    lastCheck = lineType;
  });

  return { sections: sections.map(cleanCodeLines), sectionTypes };
}


const CodeBlock = ({ children: exampleCode, language, ...props }) => {
  const [_, updateView] = React.useState(0);

  React.useEffect(() => {
    const windowPrism = window.Prism;
    window.Prism = Prism;
    applyLanguages(Prism);
    window.Prism = windowPrism;
    updateView(Date.now());
  }, []);

  const {sections, sectionTypes} = splitCode(exampleCode);
  const renderSingle = sections.length === 1 && sections[0].length === 1;

  if (!language) {
    language = props.className ? props.className.split('-')[1] : 'javascript';
  }

  if (renderSingle) {
    return (
      <CodeBlockSingle code={sections[0]} language={language} />
    );
  }

  return (
    <CodeBlockMulti sections={sections} sectionTypes={sectionTypes} language={language} />
  );
};

export default CodeBlock;
