import React, {isValidElement} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ElementContent from '@theme/CodeBlock/Content/Element';
import StringContent from '@theme/CodeBlock/Content/String';
/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join('') : children;
}

function parseOutput(content) {
  const codeRegex = /<output>([\s\S]*?)<\/output>/i;
  const code = content.replace(codeRegex, '').trim();
  const output = content.match(codeRegex)?.[1].trim();
  return { code, output };
}

export default function CodeBlock({children: rawChildren, ...props}) {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser();
  const children = maybeStringifyChildren(rawChildren);

  let CodeBlockComp;
  let code = children;
  let output = null;

  if (typeof children === 'string') {
    CodeBlockComp = StringContent;
    const parsed = parseOutput(children);
    code = parsed.code;
    output = parsed.output;
  } else {
    CodeBlockComp = ElementContent;
  }


  return (
    <CodeBlockComp key={String(isBrowser)} {...props}>
      {children}
    </CodeBlockComp>
  );
}
